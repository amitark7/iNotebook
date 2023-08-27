const express = require("express");
const router = express.Router();
const User = require("../Module/user");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");

const JSW_SECRET = "AmitIsagoodboy";
//Create A New User :Post "/api/auth/". Doesn't Require Auth
router.post(
  "/createuser",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check Email Exits Or Not In Our Database
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ success, error: "Email Already Existed" });
    }
    //Convert Password In Hashing Code
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });
    try {
      const data = {
        user: {
          id: user.id,
        },
      };
      success = true;
      const authtoken = jwt.sign(data, JSW_SECRET);
      // res.json(user);
      res.json({ success, authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Error Occured");
    }
  }
);

//New Routes:2 Login Using Vallid Cred No /api/auth/login Login Require
router.post(
  "/login",
  [
    body("email", "Enter Vallid Email").isEmail(),
    body("password", "Password Cannot Be Blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(401)
          .json({ success, error: "Enter Vallid Crendetial" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(401)
          .json({ success, error: "Enter Vallid Crendential" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JSW_SECRET);
      // res.json(user);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Error Occured");
    }
  }
);

//Create Routes:3 For GetUser Using Post: /api/auth/getuser
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Error Occured");
  }
});
module.exports = router;
