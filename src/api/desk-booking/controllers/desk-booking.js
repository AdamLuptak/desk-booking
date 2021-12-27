'use strict';

/**
 *  desk-booking controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const _ = require('lodash');

module.exports = createCoreController('api::desk-booking.desk-booking', ({ strapi }) => ({

  getOverlapBookings: async function (ctx) {
    return await strapi.db.query('api::desk-booking.desk-booking').findMany({
      where: {
        desk: ctx.request.body.data.desk,
        $or: [
          {
            from: { $between: [ctx.request.body.data.from, ctx.request.body.data.to] },
          },
          {
            to: { $between: [ctx.request.body.data.from, ctx.request.body.data.to] }
          }
        ]
      },
    });
  },

  async create(ctx) {
    if (ctx.request.body.data.from > ctx.request.body.data.to) {
      return ctx.badRequest('From can\'t be greater than to', {
        from: ctx.request.body.data.from,
        to: ctx.request.body.data.to
      })
    }

    const desk = await strapi.service('api::desk.desk').findOne(ctx.request.body.data.desk);
    if (_.isEmpty(desk)) {
      return ctx.badRequest('Desk doesn\'t exist', {
        desk: ctx.request.body.data.desk
      })
    }

    const overlapBookings = await this.getOverlapBookings(ctx);

    if (!_.isEmpty(overlapBookings)) {
      return ctx.badRequest('Booking exist', {
        from: ctx.request.body.data.from,
        to: ctx.request.body.data.to,
        overlapBookings: overlapBookings
      })
    }

    ctx.request.body.data.owner = ctx.state.user.id

    return super.create(ctx);
  },

  async update(ctx) {
    const { id } = ctx.params;
    const owner = ctx.state.user.id
    const deskBooking = await strapi.entityService.findOne('api::desk-booking.desk-booking', id, {
      populate: { owner: true },
    });

    if (_.isEmpty(deskBooking)) {
      return ctx.badRequest('Booking don\'t exist')
    }

    if (deskBooking.owner.id !== owner) {
      return ctx.forbidden('You are not owner of the booking')
    }

    const overlapBookings = await this.getOverlapBookings(ctx);

    if (!_.isEmpty(overlapBookings)) {
      return ctx.badRequest('Booking exist', {
        from: ctx.request.body.data.from,
        to: ctx.request.body.data.to,
        overlapBookings: overlapBookings
      })
    }

    return super.update(ctx);
  },

  async find(ctx) {
    return super.find(ctx)
  }


}));
