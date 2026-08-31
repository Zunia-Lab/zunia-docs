import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Zunia Docs',
  tagline: 'Multi-chain Cosmos wallet documentation',
  favicon: 'img/favicon.ico',
  future: {
    v4: true,
  },
  url: 'https://docs.zuniawallet.com',
  baseUrl: '/',
  organizationName: 'zunialab',
  projectName: 'zunia-docs',
  onBrokenLinks: 'throw',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/Zunia-Lab/zunia-docs/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    image: 'img/zunia-social-card.png',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Zunia Docs',
      logo: {
        alt: 'Zunia',
        src: 'img/zunia-mark.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://zuniawallet.com',
          label: 'Website',
          position: 'right',
        },
        {
          href: 'https://github.com/Zunia-Lab/zunia-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Product',
          items: [
            {label: 'Website', href: 'https://zuniawallet.com'},
            {label: 'Extension', href: 'https://github.com/Zunia-Lab/zunia-extension'},
            {label: 'Mobile', href: 'https://github.com/Zunia-Lab/zunia-mobile'},
          ],
        },
        {
          title: 'Developers',
          items: [
            {label: 'Chain Registry', href: 'https://github.com/Zunia-Lab/zunia-chain-registry'},
            {label: 'SDK', to: '/docs/connect/sdk'},
            {label: 'Provider API', to: '/docs/connect/dapp-api'},
            {label: 'Brand Assets', href: 'https://github.com/Zunia-Lab/zunia-brand'},
          ],
        },
        {
          title: 'Community',
          items: [
            {label: 'GitHub', href: 'https://github.com/Zunia-Lab'},
            {label: 'Contact', href: 'mailto:hello@zuniawallet.com'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Zunia Lab.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'typescript'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
