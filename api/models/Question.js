module.exports = {
  attributes: {
    text: {
      type: "String",
      required: true,
    },
    options: {
      type: "json",
      columnType: "array",
      required: true,
    },
    correctAnswer: {
      type: "json",
      required: true,
    },
    exam: {
      model: "exam",
      required: true,
    },
    studentanswer: {
      collection: "studentanswer",
      via: "question",
    },
  },
};
