/**
 * nginx returns 403 for a directory that has no index.html. The docs build
 * is a tree of those directories (one per section), so /docs/ and
 * /docs/use-wallet/ were forbidden. Each one now redirects to its first page,
 * the same way the old addresses already do.
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const build = join(import.meta.dirname, "..", "build");

/** Directory under build/docs, and the page it should open. */
const sections = {
  ".": "/docs/intro/",
  adr: "/docs/adr/overview/",
  brand: "/docs/brand/assets/",
  "chain-registry": "/docs/chain-registry/overview/",
  connect: "/docs/get-started/quickstart/",
  developers: "/docs/developers/reproducible-builds/",
  "get-started": "/docs/get-started/quickstart/",
  "getting-started": "/docs/get-started/quickstart/",
  ibc: "/docs/use-wallet/send-and-ibc/",
  integrate: "/docs/integrate/extension/",
  legal: "/docs/legal/terms/",
  reference: "/docs/reference/provider/",
  security: "/docs/security/model/",
  "use-wallet": "/docs/use-wallet/extension/",
  wallet: "/docs/use-wallet/keys/",
};

function redirect(to) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="0; url=${to}">
    <link rel="canonical" href="${to}" />
    <title>Redirect</title>
  </head>
  <script>
    window.location.href = '${to}' + window.location.search + window.location.hash;
  </script>
</html>
`;
}

for (const [dir, to] of Object.entries(sections)) {
  const file = join(build, "docs", dir, "index.html");
  writeFileSync(file, redirect(to));
}

// The image directory is not a page. A noindex file keeps nginx from answering 403.
writeFileSync(
  join(build, "img", "index.html"),
  `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="robots" content="noindex">
    <title>Zunia docs images</title>
  </head>
</html>
`,
);
