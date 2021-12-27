'use strict';

/**
 *  desk controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const _ = require('lodash');

module.exports = createCoreController('api::desk.desk', ({ strapi }) => ({


  async findAvailable(ctx) {
    const { from, to, pagination } = ctx.query;

    if (_.isEmpty(from)) {
      return ctx.badRequest('from is mandatory')
    }

    if (_.isEmpty(to)) {
      return ctx.badRequest('"to" query parameter is mandatory')
    }

    if (from > to) {
      return ctx.badRequest('From can\'t be greater than to', {
        "from": from,
        "to": to
      })
    }

    const excluded = (await strapi.db.query('api::desk-booking.desk-booking').findMany({
      where: {
        $or: [
          {
            from: { $between: [from, to] },
          },
          {
            to: { $between: [from, to] }
          }
        ]
      },
    })).map(it => it.id);

    const rs = await strapi.service('api::desk.desk').find({
      filters: {
        id: {
          $notIn: excluded,
        },
      },
      pagination: pagination
    });

    const sanitizedResults = await this.sanitizeOutput(rs.results, ctx);
    return this.transformResponse(sanitizedResults, rs.pagination);
  }

}));
