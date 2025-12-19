import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';


function HomepageHeader() {
  return (
    <header className={styles.futuristicHeader}>
      <div className={styles.backgroundAnimation}>
        
      </div>
      <div className={styles.headerContent}>
        <img
          src="/opencms-api-specs/img/OpenCMS.png"
          alt="Open CMS Logo"
          className={styles.logo}
        />

        <Heading as="h1" className={styles.mainTitle}>
          Open CMS
        </Heading>

        <p className={styles.subtitle}>
          Enterprise Card Management System
        </p>

        <div className={styles.ctaContainer}>
          <Link className={styles.ctaButton} to="/introduction">
            Get Started
          </Link>

          <Link className={styles.ctaButtonSecondary} to="/api-specifications">
            API Reference
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={siteConfig.title}
      description="Enterprise-grade Card Lifecycle Management Platform"
    >
      <HomepageHeader />
    </Layout>
  );
}
