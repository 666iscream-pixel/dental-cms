module.exports = ({ env }) => ({
  preview: {
    enabled: true,
    config: {
      allowedOrigins: env('CLIENT_URL', 'https://cyrylmickiewicz.pl'),
      async handler(uid, { documentId, locale, status }) {
        if (uid !== 'api::transformation.transformation') return null;
        const previewUrl = env('CLIENT_URL', 'https://cyrylmickiewicz.pl');
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
