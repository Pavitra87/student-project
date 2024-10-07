module.exports = {
  attributes: {
    username: {
      type: "String",
      required: true,
    },
    email: {
      type: "String",
      required: true,
      unique: true,
    },
    password: {
      type: "String",
      required: true,
      minLength: 6,
    },
    role: {
      model: "Role",
      required: true,
    },
    exam: {
      collection: "exam",
      via: "student",
    },
    result: {
      collection: "result",
      via: "student",
    },
  },
};
