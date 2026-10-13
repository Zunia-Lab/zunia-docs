import {execFileSync} from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import type {LoadContext, Plugin} from '@docusaurus/types';

/**
 * Writes the machine-readable copies of the docs at build time, from the same
 * Markdown and the same sidebar as the HTML pages, so they cannot drift:
 *
 * - /llms.txt         the index assistants fetch first (llmstxt.org format)
 * - /llms-full.txt    every page, in sidebar order
 * - /docs/<page>.md   each page as Markdown, next to its HTML URL
 * - /docs-index.json  the same pages as JSON, read by the Zunia MCP server
 */

export type LlmsOptions = {
  /** The blockquote under the title. */
  summary: string;
  /** Paragraphs after the summary. */
  details: string[];
  /** Sidebar categories listed under "Optional", which a reader may skip. */
  optionalCategories: string[];
};

type DocMetadata = {
  id: string;
  title: string;
  description: string;
  source: string;
  permalink: string;
  draft?: boolean;
  unlisted?: boolean;
  frontMatter: {description?: unknown; [key: string]: unknown};
};

type SidebarItem =
  | {type: 'doc' | 'ref'; id: string; label?: string}
  | {type: 'category'; label: string; items: SidebarItem[]; link?: {type: string; id?: string}}
  | {type: 'link' | 'html'};

type LoadedVersion = {
  docs: DocMetadata[];
  sidebars: {[sidebarId: string]: SidebarItem[]};
};

type Section = {title: string; optional: boolean; docs: DocMetadata[]};

type Page = {
  id: string;
  title: string;
  description: string;
  url: string;
  markdownUrl: string;
  section: string;
  optional: boolean;
  headings: string[];
  markdown: string;
};

const OVERVIEW = 'Overview';
const OTHER = 'Other pages';
const FENCE = /^\s*(`{3,}|~{3,})/;
const ENTITIES: {[name: string]: string} = {lt: '<', gt: '>', amp: '&', quot: '"', '#39': "'", '#x27': "'"};

function oneLine(text: string, max = 240): string {
  const flat = text.replace(/\s+/g, ' ').trim();
  if (flat.length <= max) return flat;
  const cut = flat.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
}

function decodeEntities(text: string): string {
  return text.replace(/&(lt|gt|amp|quot|#39|#x27);/g, (entity, name: string) => ENTITIES[name] ?? entity);
}

function stripFrontMatter(raw: string): string {
  const match = /^---\r?\n[\s\S]*?\r?\n---\r?\n/.exec(raw);
  return (match ? raw.slice(match[0].length) : raw).replace(/^\s+/, '');
}

/** Runs `edit` on every line outside fenced code blocks. */
function mapProse(markdown: string, edit: (line: string) => string): string {
  let fenced = false;
  return markdown
    .split('\n')
    .map((line) => {
      if (FENCE.test(line)) {
        fenced = !fenced;
        return line;
      }
      return fenced ? line : edit(line);
    })
    .join('\n');
}

function headingsOf(markdown: string): string[] {
  const found: string[] = [];
  mapProse(markdown, (line) => {
    const match = /^#{2,4}\s+(.+?)\s*#*\s*$/.exec(line);
    if (match?.[1]) found.push(match[1]);
    return line;
  });
  return found;
}

/** The first paragraph of prose under the title, for pages whose excerpt is a heading or a table cell. */
function firstParagraph(body: string): string {
  const paragraph: string[] = [];
  let fenced = false;
  for (const line of body.split('\n')) {
    if (FENCE.test(line)) {
      if (paragraph.length) break;
      fenced = !fenced;
      continue;
    }
    const text = line.trim();
    if (fenced) continue;
    if (!text || /^(#|\||[-*+]\s|\d+\.\s|:::|<|!\[|>)/.test(text)) {
      if (paragraph.length) break;
      continue;
    }
    paragraph.push(text);
  }
  return paragraph
    .join(' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/`|\*\*/g, '');
}

function describe(doc: DocMetadata, body: string): string {
  if (typeof doc.frontMatter.description === 'string') return doc.frontMatter.description;
  const excerpt = decodeEntities(doc.description);
  if (excerpt.length >= 40) return excerpt;
  const prose = firstParagraph(body);
  return prose.length >= 40 ? prose : excerpt;
}

/** Orders the docs as the sidebar does, one section per top-level category. */
function sectionsOf(version: LoadedVersion, optional: Set<string>): Section[] {
  const byId = new Map(version.docs.map((doc) => [doc.id, doc]));
  const placed = new Set<string>();
  const overview: Section = {title: OVERVIEW, optional: false, docs: []};
  const sections: Section[] = [overview];

  const collect = (items: SidebarItem[], into: DocMetadata[]) => {
    for (const item of items) {
      const ids: string[] = [];
      if (item.type === 'doc' || item.type === 'ref') ids.push(item.id);
      if (item.type === 'category' && item.link?.type === 'doc' && item.link.id) ids.push(item.link.id);
      for (const id of ids) {
        const doc = byId.get(id);
        if (doc && !placed.has(id)) {
          placed.add(id);
          into.push(doc);
        }
      }
      if (item.type === 'category') collect(item.items, into);
    }
  };

  for (const sidebar of Object.values(version.sidebars)) {
    for (const item of sidebar) {
      if (item.type === 'category') {
        const section = {title: item.label, optional: optional.has(item.label), docs: [] as DocMetadata[]};
        collect([item], section.docs);
        if (section.docs.length) sections.push(section);
      } else {
        collect([item], overview.docs);
      }
    }
  }

  const rest = version.docs.filter((doc) => !placed.has(doc.id) && !doc.unlisted && !doc.draft);
  if (rest.length) sections.push({title: OTHER, optional: false, docs: rest});

  // "Optional" goes last, as the llms.txt format expects.
  return [...sections.filter((s) => !s.optional), ...sections.filter((s) => s.optional)].filter(
    (s) => s.docs.length,
  );
}

function gitCommit(siteDir: string): string | null {
  try {
    return execFileSync('git', ['rev-parse', '--short=12', 'HEAD'], {
      cwd: siteDir,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
  } catch {
    return null;
  }
}

/** `/docs/integrate/react` → `/docs/integrate/react.md`, `/` → `/index.md`. */
function markdownPath(permalink: string): string {
  const clean = permalink.replace(/\/+$/, '');
  return clean ? `${clean}.md` : '/index.md';
}

// Docusaurus hands plugin options over as `unknown`; docusaurus.config.ts checks them with `satisfies LlmsOptions`.
export default function llmsPlugin(context: LoadContext, rawOptions: unknown): Plugin {
  const options = rawOptions as LlmsOptions;
  const {siteDir, siteConfig} = context;
  const origin = siteConfig.url.replace(/\/$/, '');
  const site = origin + siteConfig.baseUrl.replace(/\/$/, '');
  let version: LoadedVersion | undefined;

  const sourcePath = (doc: DocMetadata) => path.resolve(siteDir, doc.source.replace(/^@site\//, ''));

  /** Absolute links, so a page still works when read on its own. */
  function absolutize(markdown: string, from: string, permalinkBySource: Map<string, string>): string {
    const resolve = (target: string): string => {
      if (/^([a-z][a-z0-9+.-]*:|#|\/\/)/i.test(target)) return target;
      if (target.startsWith('/')) return `${site}${target}`;
      const [file = '', anchor] = target.split('#');
      if (!/\.mdx?$/.test(file)) return target;
      const permalink = permalinkBySource.get(path.resolve(path.dirname(from), file));
      if (!permalink) throw new Error(`llms: ${path.relative(siteDir, from)} links to ${target}, which is not a doc`);
      return `${origin}${permalink}${anchor ? `#${anchor}` : ''}`;
    };
    return mapProse(markdown, (line) =>
      line
        .replace(/(!?\[[^\]]*\]\()([^)\s]+)((?:\s+"[^"]*")?\))/g, (_, open: string, target: string, close: string) =>
          `${open}${resolve(target)}${close}`,
        )
        .replace(/^(\s*\[[^\]]+\]:\s+)(\S+)/, (_, label: string, target: string) => `${label}${resolve(target)}`),
    );
  }

  return {
    name: 'zunia-llms',

    async allContentLoaded({allContent}) {
      const docs = allContent['docusaurus-plugin-content-docs']?.default as
        | {loadedVersions: LoadedVersion[]}
        | undefined;
      version = docs?.loadedVersions[0];
    },

    async postBuild({outDir}) {
      if (!version) throw new Error('llms: the docs plugin loaded no content');
      const sections = sectionsOf(version, new Set(options.optionalCategories));
      const permalinkBySource = new Map(version.docs.map((doc) => [sourcePath(doc), doc.permalink]));

      const pages: Page[] = [];
      for (const section of sections) {
        for (const doc of section.docs) {
          const file = sourcePath(doc);
          let body = absolutize(stripFrontMatter(await fs.readFile(file, 'utf8')), file, permalinkBySource).trimEnd();
          if (!/^#\s/.test(body)) body = `# ${doc.title}\n\n${body}`;
          pages.push({
            id: doc.id,
            title: doc.title,
            description: oneLine(describe(doc, body)),
            url: `${origin}${doc.permalink}`,
            markdownUrl: `${origin}${markdownPath(doc.permalink)}`,
            section: section.title,
            optional: section.optional,
            headings: headingsOf(body),
            markdown: `${body}\n`,
          });
        }
      }

      const generatedAt = new Date().toISOString();
      const commit = gitCommit(siteDir);
      const head = [`# ${siteConfig.title}`, `> ${options.summary}`, ...options.details].join('\n\n');

      // One page as Markdown: its H1, where it lives, then the page.
      const asMarkdown = (page: Page) => page.markdown.replace(/^(#\s.*\n)/, `$1\nURL: ${page.url}\n`);

      for (const page of pages) {
        const target = path.join(outDir, new URL(page.markdownUrl).pathname);
        await fs.mkdir(path.dirname(target), {recursive: true});
        await fs.writeFile(target, asMarkdown(page));
      }

      const index = sections
        .map((section) => {
          const lines = pages
            .filter((page) => page.section === section.title)
            .map((page) => `- [${page.title}](${page.markdownUrl})${page.description ? `: ${page.description}` : ''}`);
          return `## ${section.optional ? `Optional: ${section.title}` : section.title}\n\n${lines.join('\n')}`;
        })
        .join('\n\n');
      await fs.writeFile(path.join(outDir, 'llms.txt'), `${head}\n\n${index}\n`);

      const stamp = `Built ${generatedAt}${commit ? ` from zunia-docs ${commit}` : ''}. ${pages.length} pages, in sidebar order.`;
      const full = pages.map(asMarkdown).join('\n');
      await fs.writeFile(path.join(outDir, 'llms-full.txt'), `${head}\n\n${stamp}\n\n${full}`);

      await fs.writeFile(
        path.join(outDir, 'docs-index.json'),
        `${JSON.stringify(
          {
            version: 1,
            site: origin,
            title: siteConfig.title,
            summary: options.summary,
            generatedAt,
            commit,
            sections: sections.map((section) => ({
              title: section.title,
              optional: section.optional,
              pages: section.docs.map((doc) => doc.id),
            })),
            pages,
          },
          null,
          1,
        )}\n`,
      );
    },
  };
}
