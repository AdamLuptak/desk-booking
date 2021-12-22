module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      database: 'strapi',
      user: 'strapi',
      password: 'strapi'
    },
    debug: false,
  },
});
