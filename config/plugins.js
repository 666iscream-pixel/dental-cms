module.exports = () => ({
  i18n: {
    enabled: true,
    config: {
      defaultLocale: 'pl',
      locales: ['pl', 'ru', 'en'],
    },
  },
  'drag-drop-content-types': {
    enabled: true,
  },
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
});
