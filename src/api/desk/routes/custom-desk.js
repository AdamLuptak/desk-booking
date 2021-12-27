module.exports = {
  routes: [
    { // Path defined with a URL parameter
      method: 'GET',
      path: '/desks/available',
      handler: 'desk.findAvailable',
      config: {
        policies: []
      }
    }
  ]
}
