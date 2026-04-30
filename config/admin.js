module.exports = ({ env }) => ({
  preview: {
    enabled: true,
    config: {
      allowedOrigins: [
        'https://cyryl-mickiewicz-dental-git-develop-666iscream-pixels-projects.vercel.app'
      ],
      async handler(uid, { documentId, locale, status }) {
        if (uid !== 'api::transformation.transformation') return null;
        
        const previewUrl = 'https://cyryl-mickiewicz-dental-git-develop-666iscream-pixels-projects.vercel.app';
        // Strapi 5 uses documentId for the unique identifier across locales
        return `${previewUrl}/metamorfozy?preview=${documentId}&locale=${locale || 'pl'}`;
      },
    },
  },
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});
