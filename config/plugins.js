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
      // Disable automatic responsive breakpoints to avoid forced crop requirement
      breakpoints: {
        xlarge: 1920,
        large: 1000,
        medium: 750,
        small: 500,
        xsmall: 64,
      },
      sizeOptimization: false,
      responsiveDimensions: false,
    },
  },
});
