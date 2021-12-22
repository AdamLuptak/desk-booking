module.exports = {
  beforeCreate(event) {
    const { data, where, select, populate } = event.params;
    // let's do a 20% discount everytime

  },

  async beforeUpdate(event) {
    const { data, where, select, populate } = event.params;




  },

  afterCreate(event) {
    const { result, params } = event;

    // do something to the result;
  },
};
