'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    const attributes = {
      firstname: 'admin',
      lastname: 'admin',
      email: 'simpledeskbooking@gmail.com',
      password: 'g8K<a^v<$4-;`nj"',
      roles: [1],
      isActive: true
    }

    const userAlreadyExists = await strapi.service('admin::user').exists({
      email: attributes.email,
    });

    if (!userAlreadyExists) {
      const createdUser = await strapi.service('admin::user').create(attributes);
      const userInfo = strapi.service('admin::user').sanitizeUser(createdUser);
      console.log(`Created Admin user ${JSON.stringify(userInfo)}`)
    } else {
      console.log(`Admin user already created`)
    }
  },
};
