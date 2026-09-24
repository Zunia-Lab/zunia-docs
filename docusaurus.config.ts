import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Zunia Docs',
  tagline: 'Connect a dApp to the Zunia wallet, or use the wallet itself.',
  favicon: 'img/favicon.ico',
  future: {
    v4: true,
  },
  url: 'https://docs.zunialab.com',
  baseUrl: '/',
  organizationName: 'Zunia-Lab',
  projectName: 'zunia-docs',
  onBrokenLinks: 'throw',
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },
  themes: ['@docusaurus/theme-mermaid'],
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
  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {from: '/docs/getting-started/install-extension', to: '/docs/use-wallet/extension'},
          {from: '/docs/getting-started/install-mobile', to: '/docs/use-wallet/mobile'},
          {from: '/docs/wallet/keys-and-accounts', to: '/docs/use-wallet/keys'},
          {from: '/docs/wallet/fees', to: '/docs/use-wallet/networks'},
          {from: '/docs/wallet/custom-chains', to: '/docs/use-wallet/networks'},
          {from: '/docs/ibc/transfers', to: '/docs/use-wallet/send-and-ibc'},
          {from: '/docs/ibc/staking', to: '/docs/use-wallet/staking'},
          {from: '/docs/connect/sdk', to: '/docs/get-started/quickstart'},
          {from: '/docs/connect/dapp-api', to: '/docs/reference/provider'},
          {from: '/docs/connect/native-ws', to: '/docs/integrate/qr'},
          {from: '/docs/connect/walletconnect', to: '/docs/integrate/walletconnect'},
          {from: '/docs/connect/env-matrix', to: '/docs/get-started/compatibility'},
        ],
      },
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
          'How to connect a site to the Zunia wallet (JS SDK, sign-in, QR, events) and how to use the extension and the phone.',
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
          to: '/docs/get-started/quickstart',
          label: 'SDK',
          position: 'left',
        },
        {
          href: 'https://zunialab.com',
          label: 'Website',
          position: 'right',
        },
        {
          href: 'https://x.com/ZuniaLab',
          label: 'X',
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
            {label: 'Website', href: 'https://zunialab.com'},
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
              href: 'https://zunialab.com/brand',
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
            {label: 'Quickstart', to: '/docs/get-started/quickstart'},
            {label: 'Provider API', to: '/docs/reference/provider'},
            {label: 'Connect v2', to: '/docs/reference/connect-v2'},
          ],
        },
        {
          title: 'Trust',
          items: [
            {label: 'Security model', to: '/docs/security/model'},
            {
              label: 'Disclosure',
              href: 'https://zunialab.com/legal/disclosure',
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
