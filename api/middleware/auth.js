const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];

  // Check if token is provided
  if (!token) {
    return res.status(403).send("Token is required");
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send("Invalid token");
    }
    // Attach user info to the request object
    req.user = user;
    next(); // Call the next middleware or route handler
  });
};
