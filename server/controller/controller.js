const express = require("express");
const userdb = require("../models/user");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const random = (req, res) => {
  res.send("hello world");
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const userAdd = async (req, res) => {
  const { name, email, password, cpassword } = req.body;

  if (!name || !email || !password || !cpassword) {
    res.status(422).json({ error: "fill all the details" });
  }

  try {
    const preUser = await userdb.findOne({ email: email });
    if (preUser) {
      res.status(422).json({ error: "This Email is Already Exist" });
    } else if (password !== cpassword) {
      res
        .status(422)
        .json({ error: "Password and Confirm Password Not Match" });
    } else {
      const finalUser = new userdb({
        name,
        email,
        password,
        cpassword,
      });
      const storeData = await finalUser.save();
      //console.log(storeData)
      res.status(201).json({ status: 201, storeData });
    }
  } catch (error) {
    res.status(422).json(error);
    console.log("catch block error");
  }
};

const userLogin = async (req, res) => {
  //console.log(req.body)
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(422).json({ error: "fill all the details" });
  }

  try {
    const userValid = await userdb.findOne({ email: email });
    if (userValid) {
      const isMatch = await bcrypt.compare(password, userValid.password);

      if (!isMatch) {
        res.status(422).json({ error: "invalid details" });
      } else {
        const token = await userValid.generateAuthtoken();
        //console.log(token)
        // cookiegenerate
        res.cookie("usercookie", token, {
          expires: new Date(Date.now() + 9000000),
          httpOnly: true,
          path: "/",
        });
        const result = {
          userValid,
          token,
        };
        res.status(201).json({ status: 201, result });
      }
    }
  } catch (error) {
    res.status(401).json(error);
    console.log("catch block");
  }
};

const User = async (req, res) => {
  //console.log(req.body);
  try {
    const ValidUserOne = await userdb.findOne({ _id: req.userId });
    res.status(201).json({ status: 201, ValidUserOne });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
};

const LogOut = async (req, res) => {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
      return curelem.token !== req.token;
    });
    res.clearCookie("usercookie", { path: "/" });
    await req.rootUser.save();
    res.status(201).json({ status: 201 });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
};

const PasswordLink = async (req, res) => {
  console.log(req.body);

  const { email } = req.body;
  if (!email) {
    res.status(401).json({ status: 401, message: "Enter Your Email" });
  }

  try {
    const userfind = await userdb.findOne({ email: email });

    const token = jwt.sign({ _id: userfind._id }, process.env.SECRET_KEY, {
      expiresIn: "60s",
    });

    const setUserToken = await userdb.findByIdAndUpdate(
      { _id: userfind._id },
      { verifyToken: token },
      { new: true }
    );

    if (setUserToken) {
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Sending Email For password Reset",
        text: `This Link Valid For 1 MINUTES http://localhost:3000/forget-password/${userfind.id}/${setUserToken.verifyToken}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("error", error);
          res.status(401).json({ status: 401, message: "email not send" });
        } else {
          console.log("Email sent", info.response);
          res
            .status(201)
            .json({ status: 201, message: "Email sent Succsfully" });
        }
      });
    }
  } catch (error) {
    res.status(401).json({ status: 401, message: "invalid user" });
  }
};

const forgetpassword = async (req, res) => {
  const { id, token } = req.params;
  try {
    const validuser = await userdb.findOne({ _id: id, verifyToken: token });
    // const validuser = await userdb.findById(id);
    const verifyToken23 = jwt.verify(token, process.env.SECRET_KEY);
    if (validuser && verifyToken23._id) {
      res.status(201).json({ status: 201, validuser });
    } else {
      res.status(401).json({ status: 401, message: "user not exist" });
    }
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
};

const tokenId = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  try {
    const validuser = await userdb.findOne({ _id: id, verifyToken: token });
    const verifyToken23 = jwt.verify(token, process.env.SECRET_KEY);
    if (validuser && verifyToken23._id) {
      const salt = bcrypt.genSaltSync(10);
      const newpassword = await bcrypt.hash(password, salt);
      const setnewuserpass = await userdb.findByIdAndUpdate(
        { _id: id },
        { password: newpassword }
      );
      setnewuserpass.save();
      res.status(201).json({ status: 201, setnewuserpass });
    } else {
      res.status(401).json({ status: 401, message: "user not exist" });
    }
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
};

module.exports = {
  random,
  userAdd,
  userLogin,
  User,
  LogOut,
  PasswordLink,
  forgetpassword,
  tokenId,
};
