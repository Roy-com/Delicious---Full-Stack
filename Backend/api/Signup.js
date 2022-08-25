require("dotenv").config();
const express = require("express");
const router = express.Router();
const UserCollection = require("../model/UserDetails");
const UserDetails = UserCollection.UserDetails;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {validate}= require("../utils/Validation")
const Joi = require("joi");
//  Register the New Users
router.post("/register", async (req, res) => {
  const { name, email, password, repassword } = (req.body);
  
  // password hashing 
  const encryptedPassword = await bcrypt.hash(password, 10);
  const encryptedrePassword = await bcrypt.hash(repassword, 10);

  // validate the user input value 
  const { error } =  validate(req.body);
  if (error)
  {
    return res.json({ error: error.details[0].message });
  }
  try {
    const oldUser = await UserDetails.findOne({ email });

    if (oldUser) {
      return res.json({ error: "User already Exists" });
    }

    if (password != repassword) {
      return res.json({ error: "Password don't match" });
    }
    const token = await jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: 360000,
    });
    await UserDetails.create({
      name,
      email,
      password: encryptedPassword,
      repassword: encryptedrePassword,
    });
    return res.json({ status: "ok", token: token });
  } catch (error) {
    console.log(error);
    res.send({ status: "error", error: error });
  }
});
module.exports = router;
