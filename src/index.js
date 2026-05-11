'use strict';

// Content types that should be publicly readable
const PUBLIC_CONTENT_TYPES = [
  'api::footer-content.footer-content',
  'api::contact.contact',
  'api::service-item.service-item',
  'api::about-page.about-page',
  'api::home-page.home-page',
  'api::price-item.price-item',
  'api::team-member.team-member',
  'api::transformation.transformation',
  'api::clinic-history.clinic-history',
  'api::clinic-rules.clinic-rules',
  'api::privacy-policy.privacy-policy',
  'api::aftercare.aftercare',
];

module.exports = {
  register(/*{ strapi }*/) {},

  async bootstrap({ strapi }) {
    try {
      const publicRole = await strapi
        .query('plugin::users-permissions.role')
        .findOne({ where: { type: 'public' } });

      if (!publicRole) {
        console.log('[bootstrap] Public role not found, skipping permission setup');
        return;
      }

      for (const uid of PUBLIC_CONTENT_TYPES) {
        for (const action of ['find', 'findOne']) {
          const actionId = `${uid}.${action}`;
          const existing = await strapi
            .query('plugin::users-permissions.permission')
            .findOne({ where: { action: actionId, role: publicRole.id } });

          if (!existing) {
            await strapi
              .query('plugin::users-permissions.permission')
              .create({ data: { action: actionId, role: publicRole.id, enabled: true } });
            console.log(`[bootstrap] Granted public: ${actionId}`);
          } else if (!existing.enabled) {
            await strapi
              .query('plugin::users-permissions.permission')
              .update({ where: { id: existing.id }, data: { enabled: true } });
            console.log(`[bootstrap] Enabled public: ${actionId}`);
          }
        }
      }
      console.log('[bootstrap] Public permissions ensured.');
    } catch (err) {
      console.error('[bootstrap] Error setting permissions:', err.message);
    }
  },
};
