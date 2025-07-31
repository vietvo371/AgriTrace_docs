import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'AgriTrace Docs',
  tagline: 'Agricultural Product Traceability Platform for Vietnamese Farmers',
  favicon: 'img/favicon.ico',
  url: 'https://vietvo371.github.io',
  baseUrl: '/AgriTrace_docs/',
  organizationName: 'vietvo371',
  projectName: 'AgriTrace_docs',
  trailingSlash: true,
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  deploymentBranch: 'gh-pages',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'vi'],
  },
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'api',
        path: 'api',
        routeBasePath: 'api-reference',
        sidebarPath: './sidebars.api.ts',
        sidebarCollapsible: true,
        sidebarCollapsed: false,
      },
    ],
  ],
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          editUrl: 'https://github.com/vietvo371/AgriTrace_docs/edit/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    metadata: [{name: 'keywords', content: 'agriculture, traceability, QR codes, React Native, Vietnam, farmers'}],
    image: 'img/AgriTrace.png',
    navbar: {
      title: 'AgriTrace',
      logo: {
        alt: 'AgriTrace Logo',
        src: 'img/AgriTrace.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          type: 'docSidebar',
          sidebarId: 'apiSidebar',
          position: 'left',
          label: 'API Reference',
          docsPluginId: 'api',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/vietvo371/AgriTrace',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/intro',
            },
            {
              label: 'Architecture',
              to: '/Architecture',
            },
            {
              label: 'Installation',
              to: '/Installation',
            },
            {
              label: 'API Reference',
              to: '/api/',
            },
          ],
        },
        {
          title: 'Features',
          items: [
            {
              label: 'QR Code Generation',
              to: '/Features#qr-code-generation',
            },
            {
              label: 'Product Tracing',
              to: '/Features#product-tracing',
            },
            {
              label: 'User Management',
              to: '/Features#user-management',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/vietvo371/AgriTrace',
            },
            {
              label: 'Issues',
              href: 'https://github.com/vietvo371/AgriTrace/issues',
            },
            {
              label: 'Contributing',
              to: '/Contributing',
            },
          ],
        },
        {
          title: 'Team',
          items: [
            {
              label: 'Nguyễn Quốc Long',
              href: 'mailto:quoclongdng@gmail.com',
            },
            {
              label: 'Lê Thanh Trường',
              href: 'mailto:thanhtruong23111999@gmail.com',
            },
            {
              label: 'Võ Văn Việt',
              href: 'mailto:vietvo371@gmail.com',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} AgriTrace. Built with ❤️ by DTU-DZ Team.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['sql', 'json', 'bash'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
