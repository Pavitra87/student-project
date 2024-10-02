const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async function (req, res) {
    const { username, email, password, role } = req.body;
    try {
      const existinguser = await User.findOne({ email });

      if (existinguser) {
        return res.status(401).json({ error: "user already exist" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      // Fetch the role ID based on the role name
      const foundRole = await Role.findOne({ where: { name: role } });

      // Check if the role exists
      if (!foundRole) {
        return res.status(400).json({ error: "Role does not exist" });
      }

      const user = await User.create({
        username,
        email,
        password: hashedPassword,
        role: foundRole.id,
      });
      res.status(200).json(user);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(400).json({ error: "Internal server error" });
    }
  },

  //login

  login: async function (req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      console.log(user)

      if (!user) {
        res.status(401).json({ error: "user notfound" });
        console.log("user notfound");
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credintials" });
      }

      const accessToken = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
      );
      console.log("error");
      res.status(200).json({
        message: "Login succesfully",
        accessToken,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
