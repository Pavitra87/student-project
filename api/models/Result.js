module.exports = {
  attributes: {
    score: { type: 'number', required: true },
    student: {
      model: "user",
      required: true,
    },
    exam: {
      model: "exam",
      required: true,
    },
  },
};
