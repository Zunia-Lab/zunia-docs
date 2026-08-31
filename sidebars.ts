import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting started',
      items: [
        'getting-started/install-extension',
        'getting-started/install-mobile',
      ],
    },
    {
      type: 'category',
      label: 'Wallet basics',
      items: [
        'wallet/keys-and-accounts',
        'wallet/fees',
        'wallet/custom-chains',
      ],
    },
    {
      type: 'category',
      label: 'IBC and staking',
      items: ['ibc/transfers', 'ibc/staking'],
    },
    {
      type: 'category',
      label: 'Connect to dApps',
      items: ['connect/dapp-api', 'connect/walletconnect'],
    },
    {
      type: 'category',
      label: 'Chain registry',
      items: ['chain-registry/overview', 'chain-registry/contribute'],
    },
    'security/model',
    'faq',
    'brand/assets',
  ],
};

export default sidebars;
