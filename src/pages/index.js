import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import useBaseUrl from '@docusaurus/useBaseUrl';
import HomePageFeatures from '@site/src/Components/HomePageFeatures';
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
          Ethiopia's National Payment Switch - Driving Financial Inclusion through Secure, Interoperable Digital Infrastructure
        </p>

        <div className={styles.ctaContainer}>
          <Link className={styles.ctaButton} to="/intro-ethswitch">
            🚀 Get Started
          </Link>

          <Link
            className={styles.ctaButtonSecondary}
            to="/api-specifications"
          >
            📋 API Documentation
          </Link>
        </div>
      </div>
    </header>
  );
}

function StatsSection() {
  const stats = [
    { number: '25+', label: 'Partner Banks', icon: '🏦' },
    { number: '24/7', label: 'Real-time Processing', icon: '⚡' },
    { number: '100%', label: 'Secure Transactions', icon: '🔒' },
    { number: '1M+', label: 'Daily Transactions', icon: '💳' },
  ];

  return (
    <section className={styles.statsSection}>
      <div className={styles.container}>
        <Heading as="h2" className={styles.sectionTitle}>
          Transforming Ethiopia's Payment Ecosystem
        </Heading>
        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.statIcon}>{stat.icon}</div>
              <div className={styles.statNumber}>{stat.number}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuickLinks() {
  const links = [
    {
      title: '📖 Documentation',
      description: 'Comprehensive guides and API references',
      href: '/intro-ethswitch',
    },
    {
      title: '🏢 Enterprise Portal',
      description: 'Back office management and monitoring',
      href: '/backoffice-ethswitch',
    },
    {
      title: '🏦 Bank Portal',
      description: 'Banking partner integration portal',
      href: '/BankPortal-Backoffice',
    },
  ];

  return (
    <section className={styles.quickLinksSection}>
      <div className={styles.container}>
        <Heading as="h2" className={styles.sectionTitle}>
          Quick Access
        </Heading>
        <div className={styles.quickLinksGrid}>
          {links.map((link, index) => (
            <Link key={index} to={link.href} className={styles.quickLinkCard}>
              <h3>{link.title}</h3>
              <p>{link.description}</p>
              <span className={styles.linkArrow}>→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
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
      <main>
        <StatsSection />
        <HomePageFeatures />
        <QuickLinks />
      </main>
    </Layout>
  );
}
