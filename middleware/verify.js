const jwt = require("jsonwebtoken");
require("dotenv").config();
const verify = (req, res, next) => {
  try {
    const data = req.header("Authorization");
    const token = data.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Access denied" });
    const decoded = jwt.verify(token, process.env.key);
    next();
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = verify;
