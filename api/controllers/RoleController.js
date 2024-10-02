module.exports = {
  create: async function (req, res) {
    const { name } = req.body;

    try {
      const role = await Role.create({ name });
      console.log(role);
      res.status(201).json(role);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  },

  find: async function (req, res) {
    try {
      const roles = await Role.find();
      res.status(200).json(roles);
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
