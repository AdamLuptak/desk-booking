'use strict';

/**
 *  desk-booking controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const _ = require('lodash');


module.exports = createCoreController('api::desk-booking.desk-booking', ({ strapi }) => ({

  async create(ctx) {
    if (ctx.request.body.data.from > ctx.request.body.data.to) {
      return ctx.badRequest('From can\'t be greater than to', {
        from: ctx.request.body.data.from,
        to: ctx.request.body.data.to
      })
    }

    // const desk = await strapi.service('api::desk.desk').findOne(ctx.request.body.data.desk);
    // if (_.isEmpty(desk)) {
    //   return ctx.badRequest('Desk doesn\'t exist', {
    //     desk: ctx.request.body.data.desk
    //   })
    // }
    // Find if there is existing bookings
    // const overlapBookings = await strapi.db.query('api::desk-booking.desk-booking').findMany({
    //   where: {
    //     desk: ctx.request.body.data.desk,
    //     $or: [
    //       {
    //         from: { $between: [ctx.request.body.data.from, ctx.request.body.data.to] },
    //       },
    //       {
    //         to: { $between: [ctx.request.body.data.from, ctx.request.body.data.to] }
    //       }
    //     ]
    //   },
    // });
    //
    // if (!_.isEmpty(overlapBookings)) {
    //   return ctx.badRequest('Booking exist', {
    //     from: ctx.request.body.data.from,
    //     to: ctx.request.body.data.to,
    //     overlapBookings: overlapBookings
    //   })
    // }

    ctx.request.body.data.owned = ctx.state.user.id

    try {
      return await super.create(ctx);
    } catch (e) {
      console.log(e)
      throw e
    }
  },

  async update(ctx) {
    // some custom logic here
    ctx.query = { ...ctx.query, local: 'en' }
    ctx.request.body.data.owned = ctx.state.user.id
    // Calling the default core action
    try {
      const r = await strapi.service('api::desk-booking.desk-booking').findOne(21);
      console.log(r)
    } catch (e) {
      console.log(e)
    }

    const { data, meta } = await super.update(ctx);

    // some more custom logic
    meta.date = Date.now()

    return { data, meta };

  }

}));
