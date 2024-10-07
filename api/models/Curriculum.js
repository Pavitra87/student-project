module.exports = {
  attributes: {
    name: {
      type: 'String',
      required: true,
    },
    batch: {
      model: "batch",
      required: true,
    },
    exam: {
      collection: "exam",
      via: "curriculum",
    },
  },
};
