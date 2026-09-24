import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Get started',
      items: ['get-started/quickstart', 'get-started/compatibility'],
    },
    {
      type: 'category',
      label: 'Integrate',
      items: [
        'integrate/extension',
        'integrate/react',
        'integrate/sign-in',
        'integrate/events',
        'integrate/qr',
        'integrate/walletconnect',
        'integrate/suggest-chain',
        'integrate/flutter',
        'integrate/troubleshooting',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      items: [
        'reference/provider',
        'reference/sdk',
        'reference/events',
        'reference/errors',
        'reference/connect-v2',
        'reference/sign-in',
      ],
    },
    {
      type: 'category',
      label: 'Security',
      items: ['security/model'],
    },
    {
      type: 'category',
      label: 'Use the wallet',
      items: [
        'use-wallet/extension',
        'use-wallet/mobile',
        'use-wallet/keys',
        'use-wallet/networks',
        'use-wallet/send-and-ibc',
        'use-wallet/staking',
      ],
    },
    'faq',
    {
      type: 'category',
      label: 'Chain registry',
      items: ['chain-registry/overview', 'chain-registry/contribute'],
    },
    {
      type: 'category',
      label: 'Brand',
      items: ['brand/assets'],
    },
    {
      type: 'category',
      label: 'Legal (draft)',
      items: ['legal/terms', 'legal/privacy', 'legal/gdpr-data-map', 'legal/app-store-encryption'],
    },
    {
      type: 'category',
      label: 'Architecture',
      items: ['adr/overview'],
    },
    {
      type: 'category',
      label: 'Developers',
      items: ['developers/reproducible-builds'],
    },
  ],
};

export default sidebars;
