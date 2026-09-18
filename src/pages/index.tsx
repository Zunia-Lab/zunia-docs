import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const sections = [
  {
    title: 'Get started',
    body: 'Install the extension or mobile wallet and open your first account.',
    to: '/docs/getting-started/install-extension',
  },
  {
    title: 'Connect a dApp',
    body: 'Drop-in provider API, WalletConnect, and the TypeScript SDK.',
    to: '/docs/connect/sdk',
  },
  {
    title: 'IBC & staking',
    body: 'Transfers, channels, fees, and delegation flows across Cosmos.',
    to: '/docs/ibc/transfers',
  },
  {
    title: 'Security',
    body: 'Self-custody model, key storage, and responsible disclosure.',
    to: '/docs/security/model',
  },
] as const;

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const mark = useBaseUrl('/img/zunia-mark.svg');

  return (
    <header className={styles.hero}>
      <div className={styles.heroGlow} aria-hidden />
      <div className={clsx('container', styles.heroInner)}>
        <div className={styles.brandRow}>
          <img src={mark} alt="" className={styles.brandMark} width={36} height={45} />
          <span className={styles.brandWord}>zunia</span>
          <span className={styles.brandDocs}>docs</span>
        </div>
        <Heading as="h1" className={styles.title}>
          {siteConfig.title}
        </Heading>
        <p className={styles.subtitle}>{siteConfig.tagline}</p>
        <p className={styles.lede}>
          Guides for the browser extension, mobile wallet, IBC transfers, staking,
          and the dApp connect SDK. Keys stay on device.
        </p>
        <div className={styles.actions}>
          <Link
            className={clsx('button button--primary button--lg', styles.cta)}
            to="/docs/intro">
            Get started
          </Link>
          <Link
            className={clsx('button button--outline button--lg', styles.ghost)}
            to="/docs/connect/sdk">
            Integrate SDK
          </Link>
        </div>
      </div>
    </header>
  );
}

function SectionGrid() {
  return (
    <section className={styles.gridSection}>
      <div className="container">
        <div className={styles.grid}>
          {sections.map((item) => (
            <Link key={item.to} className={styles.card} to={item.to}>
              <h2 className={styles.cardTitle}>{item.title}</h2>
              <p className={styles.cardBody}>{item.body}</p>
              <span className={styles.cardMeta}>Open →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Documentation"
      description="Multi-chain Cosmos wallet documentation for Zunia extension, mobile, and SDK.">
      <HomepageHeader />
      <main>
        <SectionGrid />
      </main>
    </Layout>
  );
}
