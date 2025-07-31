import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: '🚀 Introduction',
    },
    {
      type: 'doc',
      id: 'GettingStarted',
      label: '📝 Getting Started',
    },
    {
      type: 'category',
      label: '📚 Features',
      items: [
        'Features',
        'Workflow',
      ],
    },
    {
      type: 'doc',
      id: 'Architecture',
      label: '🏗️ System Architecture',
    },
    {
      type: 'doc',
      id: 'Installation',
      label: '🔧 Installation Guide',
    },
    {
      type: 'doc',
      id: 'Database',
      label: '🗄️ Database Schema',
    },
    {
      type: 'category',
      label: '📖 User Guides',
      items: [
        'Guides/farmer-guide',
        'Guides/consumer-guide',
        'Guides/admin-guide',
      ],
    },
    {
      type: 'doc',
      id: 'Deployment',
      label: '🚀 Deployment Guide',
    },
    {
      type: 'doc',
      id: 'Contributing',
      label: '🤝 Contributing',
    },
    {
      type: 'doc',
      id: 'License',
      label: '📜 License',
    },
  ],
};

export default sidebars;
