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
    body: 'How the wallet, the SDKs and the relay fit together, then a five-minute connect.',
    to: '/docs/intro',
  },
  {
    title: 'Integrate',
    body: 'Extension, React, sign-in, live events, QR pairing and WalletConnect.',
    to: '/docs/get-started/quickstart',
  },
  {
    title: 'Use the wallet',
    body: 'Install a build, manage keys and networks, send, IBC and stake.',
    to: '/docs/use-wallet/extension',
  },
  {
    title: 'Security',
    body: 'Self-custody, per-origin grants, domain-bound sign-in, and what the relay sees.',
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
          Guides for connecting a site to Zunia, signing in without a transaction,
          and using the extension or the phone. Keys stay on the device.
        </p>
        <div className={styles.actions}>
          <Link
            className={clsx('button button--primary button--lg', styles.cta)}
            to="/docs/intro">
            How it works
          </Link>
          <Link
            className={clsx('button button--outline button--lg', styles.ghost)}
            to="/docs/get-started/quickstart">
            Connect a site
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
      description="Connect a dApp to the Zunia wallet, or use the extension and the phone.">
      <HomepageHeader />
      <main>
        <SectionGrid />
      </main>
    </Layout>
  );
}
