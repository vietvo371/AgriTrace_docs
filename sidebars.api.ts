import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  apiSidebar: [
    {
      type: 'doc',
      id: 'api/index',
      label: '📚 API Overview',
    },
    {
      type: 'category',
      label: '🔐 Authentication',
      items: [
        'api/auth/login',
        'api/auth/register',
        'api/auth/refresh',
      ],
    },
    {
      type: 'category',
      label: '👥 Users',
      items: [
        'api/users/profile',
        'api/users/update',
        'api/users/delete',
      ],
    },
    {
      type: 'category',
      label: '📦 Products & Batches',
      items: [
        'api/batches/create',
        'api/batches/list',
        'api/batches/detail',
        'api/batches/update',
        'api/batches/delete',
        'api/products/categories',
      ],
    },
    {
      type: 'category',
      label: '🔍 QR Codes',
      items: [
        'api/qr/generate',
        'api/qr/scan',
        'api/qr/validate',
      ],
    },
    {
      type: 'category',
      label: '⭐ Reviews',
      items: [
        'api/reviews/create',
        'api/reviews/list',
        'api/reviews/update',
      ],
    },
    {
      type: 'category',
      label: '👨‍💼 Admin',
      items: [
        'api/admin/dashboard',
        'api/admin/users',
        'api/admin/categories',
        'api/admin/permissions',
      ],
    },
    {
      type: 'doc',
      id: 'api/errors',
      label: '⚠️ Error Codes',
    },
  ],
};

export default sidebars; 