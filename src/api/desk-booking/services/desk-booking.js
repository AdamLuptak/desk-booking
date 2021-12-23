'use strict';

/**
 * desk-booking service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::desk-booking.desk-booking', ({ strapi }) => ({

  async create(...args) {
    return super.create(...args)
  }


}));
