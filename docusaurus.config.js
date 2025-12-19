// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Open CMS',
  tagline: 'Enterprise Card Management System',
  favicon: 'img/favicon.png',

  // GitHub Pages config (repo: uneebae/opencms-api-specs)
  url: 'https://uneebae.github.io',
  baseUrl: '/opencms-api-specs/',
  organizationName: 'uneebae',
  projectName: 'opencms-api-specs',

  onBrokenLinks: 'throw',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
      onBrokenMarkdownImages: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.js',

          // Docs as homepage
          routeBasePath: '/',

          editUrl: 'https://github.com/uneebae/opencms-api-specs/tree/UNEEB2/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  plugins: [
    [
      '@scalar/docusaurus',
      {
        id: 'openCMS',
        label: 'API Specifications',
        route: '/api-specifications',
        showNavLink: false,
        configuration: {
          // ✅ file is located in: static/openapi/OpenCMS-3.3.yml
          url: 'openapi/OpenCMS-3.3.yml',

          layout: 'modern',
          theme: 'default',
          darkMode: true,
          defaultOpenAllTags: false,

          hideModels: false,
          hideTestRequestButton: false,
          hideSearch: false,
          hideDarkModeToggle: false,

          // Branding
          hideLogo: false,
          branding: {
            title: 'Open CMS API',
            logo: '/img/PaysysLogo.png',
            favicon: '/img/favicon.png',
          },
        },
      },
    ],
  ],

  themeConfig: {
    image: 'img/OpenCMS.png',

    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },

    navbar: {
      logo: {
        alt: 'Paysys Labs Logo',
        src: '/img/PaysysLogo.png',
        href: '/',
      },
      items: [
        { to: '/', label: 'Overview', position: 'left' },
        { to: '/api-specifications', label: 'API Specifications', position: 'left' },
        { type: 'doc', docId: 'backOffice', label: 'Back Office', position: 'left' },
        { href: 'https://github.com/uneebae/opencms-api-specs', label: 'GitHub', position: 'right' },
      ],
    },

    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            { label: 'Getting Started', to: '/introduction' },
            { label: 'API Reference', to: '/api-specifications' },
            { label: 'Developer Workflow', to: '/developerWorkflow' },
          ],
        },
        {
          title: 'Resources',
          items: [
            { label: 'Back Office', to: '/backOffice' },
            { label: 'Data Types', to: '/dataTypeRef' },
            { label: 'Response Codes', to: '/response' },
          ],
        },
        {
          title: 'Legal',
          items: [
            { label: 'Privacy Policy', href: 'https://paysyslabs.com/privacy' },
            { label: 'Terms of Service', href: 'https://paysyslabs.com/terms' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Paysys Labs. All rights reserved.`,
    },

    prism: {
      theme: prismThemes.nightOwl,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;
