import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Secure & Reliable',
    icon: '🔒',
    description: (
      <>
        Built with enterprise-grade security standards ensuring safe and reliable 
        payment processing across Ethiopia's banking ecosystem with 99.9% uptime.
      </>
    ),
  },
  {
    title: 'Real-time Processing',
    icon: '⚡',
    description: (
      <>
        Lightning-fast transaction processing with real-time settlement capabilities,
        enabling instant payments between financial institutions nationwide.
      </>
    ),
  },
  {
    title: 'Interoperable Platform',
    icon: '🌐',
    description: (
      <>
        Seamlessly connects all domestic banks and financial institutions through
        standardized APIs, fostering financial inclusion and digital transformation.
      </>
    ),
  },
];

function Feature({icon, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <div className={styles.featureIcon}>{icon}</div>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="text--center">
          <h2>Why Choose ETHSwitch?</h2>
          <p>Built for Ethiopia's financial ecosystem with cutting-edge technology</p>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
