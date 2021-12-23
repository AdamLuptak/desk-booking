module.exports = ({ env }) => ({
  email: {
    config: {
      provider: 'sendgrid',
      providerOptions: {
        apiKey: '-',
      },
      settings: {
        defaultFrom: 'adamluptakosice@gmail.com',
        defaultReplyTo: 'adamluptakosice@gmail.com',
        testAddress: 'adamluptakosice@gmail.com',
      },
    },
  },
});
