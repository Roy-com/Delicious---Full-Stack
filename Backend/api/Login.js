
const express = require("express");
const router = express.Router();
const UserCollection = require("../model/UserDetails");
const UserDetails = UserCollection.UserDetails;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//  Login

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserDetails.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = await jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: 1000,
    });

    if (res.status(201)) {
      // return res.json({ status: "ok", data: token });
      // Send JSON WEB TOKEN

      return res.json({ status: "ok", token: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "InvAlid Password" });
});
module.exports = router;
