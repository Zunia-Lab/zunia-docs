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
  organizationName: 'Zunia-Lab',
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
    metadata: [
      {
        name: 'theme-color',
        content: '#0B0A09',
      },
      {
        name: 'description',
        content:
          'Guides for the Zunia browser extension, mobile wallet, IBC, staking, and dApp SDK.',
      },
    ],
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: false,
      disableSwitch: false,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    navbar: {
      title: '',
      hideOnScroll: false,
      logo: {
        alt: 'Zunia Docs',
        src: 'img/zunia-docs-black.svg',
        srcDark: 'img/zunia-docs-white.svg',
        width: 118,
        height: 30,
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          to: '/docs/connect/sdk',
          label: 'SDK',
          position: 'left',
        },
        {
          href: 'https://zuniawallet.com',
          label: 'Website',
          position: 'right',
        },
        {
          href: 'https://github.com/Zunia-Lab',
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
            {
              label: 'Extension',
              href: 'https://github.com/Zunia-Lab/zunia-extension',
            },
            {
              label: 'Mobile',
              href: 'https://github.com/Zunia-Lab/zunia-mobile',
            },
            {
              label: 'Brand',
              href: 'https://github.com/Zunia-Lab/zunia-brand',
            },
          ],
        },
        {
          title: 'Developers',
          items: [
            {
              label: 'Chain Registry',
              href: 'https://github.com/Zunia-Lab/zunia-chain-registry',
            },
            {label: 'SDK', to: '/docs/connect/sdk'},
            {label: 'Provider API', to: '/docs/connect/dapp-api'},
            {label: 'WalletConnect', to: '/docs/connect/walletconnect'},
          ],
        },
        {
          title: 'Trust',
          items: [
            {label: 'Security model', to: '/docs/security/model'},
            {
              label: 'Disclosure',
              href: 'https://github.com/Zunia-Lab/.github/blob/main/SECURITY.md',
            },
            {label: 'FAQ', to: '/docs/faq'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Zunia Lab. Apache 2.0.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.oneDark,
      additionalLanguages: ['bash', 'json', 'typescript', 'toml'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
