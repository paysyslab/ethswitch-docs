import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={styles.futuristicHeader}>
      {/* Background animation layer */}
      <div className={styles.backgroundAnimation} />

      <div className={styles.headerContent}>
        <img
          src={useBaseUrl('/img/ethswitch.png')}
          alt="ethswitch"
          className={styles.headerImage}
        />

        <Heading as="h1" className={styles.mainTitle}>
          ETHSWITCH
        </Heading>

        <p className={styles.subtitle}>
          Driving Financial Inclusion through Interoperable Digital Infrastructure
        </p>

        <div className={styles.ctaContainer}>
          <Link className={styles.ctaButton} to="/intro-ethswitch">
            Get Started
          </Link>

          <Link
            className={styles.ctaButtonSecondary}
            to="/api-specifications"
          >
            API Reference
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function HomePage() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={siteConfig.title}
      description="Ethswitch is Ethiopia's national payment switch, owned by all domestic banks and dedicated to modernizing the financial system through secure, interoperable e-payment infrastructure."
    >
      <HomepageHeader />
    </Layout>
  );
}
