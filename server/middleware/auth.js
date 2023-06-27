const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const jwt = require("jsonwebtoken");
const userdb = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log(verifyToken);
    const rootUser = await userdb.findOne({ _id: verifyToken._id });
    console.log(rootUser);
    if (!rootUser) {
      throw new Error("User not found");
    }
    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ status: 401, message: "Unauthorized no token provide" });
  }
};

module.exports = auth;
