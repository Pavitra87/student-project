module.exports = {
  attributes: {
    name: {
      type: 'String',
      required: true,
    },
    curriculum: {
      model: "curriculum",
      required: true,
    },
    question: {
      collection: "question",
      via: "exam",
    },
    student: {
      model: "user",
      required: true,
    },
  },
};
