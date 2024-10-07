module.exports = {
  attributes: {
    name: {
      type: 'String',
      required: true,
    },
    curriculum:{
      collection:'curriculum',
      via:'batch'
    }
  },
};
