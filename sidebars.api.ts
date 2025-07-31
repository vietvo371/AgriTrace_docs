import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  apiSidebar: [
    {
      type: 'doc',
      id: 'index',
      label: '📚 API Overview',
    },
    {
      type: 'category',
      label: '🔐 Authentication',
      items: [
        'auth/login',
      ],
    },
    {
      type: 'category',
      label: '📦 Products & Batches',
      items: [
        'batches/create',
      ],
    },
    {
      type: 'doc',
      id: 'errors',
      label: '⚠️ Error Codes',
    },
  ],
};

export default sidebars; 