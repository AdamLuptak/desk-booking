module.exports = ({ env }) => ({
  email: {
    config: {
      provider: 'strapi-provider-email-smtp',
      providerOptions: {
        host: 'smtp.gmail.com', //SMTP Host
        port: 465   , //SMTP Port
        secure: true,
        username: 'simpledeskbooking@gmail.com',
        password: 'g8K<a^v<$4-;`nj"',
        rejectUnauthorized: true,
        requireTLS: true,
        connectionTimeout: 1,
      },
    },
    settings: {
      from: 'simpledeskbooking@gmail.com',
      replyTo: 'simpledeskbooking@gmail.com',
    },
  },
});
