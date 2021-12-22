module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '419e8de374c3b29d83c780b9c97bb0ce'),
  },
});
