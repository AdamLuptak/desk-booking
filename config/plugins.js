module.exports = ({ env }) => ({
  email: {
    config: {
      provider: 'sendgrid',
      providerOptions: {
        apiKey: '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',
      },
      settings: {
        defaultFrom: 'adamluptakosice@gmail.com',
        defaultReplyTo: 'adamluptakosice@gmail.com',
        testAddress: 'adamluptakosice@gmail.com',
      },
    },
  },
});
