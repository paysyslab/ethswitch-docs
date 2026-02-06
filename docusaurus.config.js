// @ts-check
const { themes: prismThemes } = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'ETHSwitch',
  tagline: 'EthSwitch is Ethiopia\'s national payment switch enabling secure, interoperable, and real-time digital payments across the domestic banking ecosystem.',
  favicon: 'img/favicon.png',

  // GitHub Pages config - UPDATED FOR UNEEBAE REPO
  url: 'https://paysyslab.github.io',
  baseUrl: '/ethswitch-docs/',
  organizationName: 'paysyslab',
  projectName: 'ethswitch-docs',
  
  trailingSlash: false,

  onBrokenLinks: 'throw',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
      onBrokenMarkdownImages: 'ignore',
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
          routeBasePath: '/',
          editUrl: 'https://github.com/paysyslab/ethswitch-docs/tree/main/',
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
        id: 'ethswitch',
        label: 'API Specifications',
        route: '/api-specifications',
        showNavLink: false,
        configuration: {
          spec: {
            url: '/ethswitch-docs/openapi/ETS-api.yml',
          },
          layout: 'modern',
          theme: 'default',
          darkMode: true,
          defaultOpenAllTags: false,
          hideModels: false,
          hideTestRequestButton: false,
          hideSearch: false,
          hideDarkModeToggle: false,
          hideLogo: false,
          withCredentials: false,
          branding: {
            title: 'ETHSWITCH API',
            logo: '/ethswitch-docs/img/PaysysLogo.png',
            favicon: '/ethswitch-docs/img/favicon.png',
          },
        },
      },
    ],
  ],

  themeConfig: {
    image: 'img/PaysysLogo.png',

    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },

    navbar: {
      logo: {
        alt: 'ETHSwitch Logo',
        src: 'img/eslogo.png',
        href: '/',
      },
      items: [
        { to: '/', label: 'Overview', position: 'left' },
        { to: '/api-specifications', label: 'API Specification', position: 'left' },
        { to: '/backoffice-ethswitch', label: 'Enterprise Portal Back Office', position: 'left' },
        { to: '/BankPortal-Backoffice', label: 'Bank Portal Back Office', position: 'left' },
        { href: 'https://github.com/paysyslab/ethswitch-docs', label: 'GitHub', position: 'right' },
      ],
    },

    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            { label: 'Introduction', to: '/intro-ethswitch' },
            { label: 'API Specification', to: '/api-specifications' },
            { label: 'Back Office', to: '/backoffice-ethswitch' },
            { label: 'Bank Portal', to: '/BankPortal-Backoffice' },
          ],
        },
        {
          title: 'API',
          items: [
            { label: 'API Reference (OpenAPI)', to: '/api-specifications' },
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

module.exports = config;