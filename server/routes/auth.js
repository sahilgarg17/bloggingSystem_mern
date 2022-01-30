const express = require("express");

const router = express.Router();

const User = require("../models/Users");

const bcryptjs = require("bcryptjs");

const jwt = require("jsonwebtoken");


// creating a new user -> Sign up

router.post("/createuser", async (req, res) => {
  try {
    const salt = await bcryptjs.genSalt(10);

    const hashPassword = await bcryptjs.hash(req.body.password, salt);

    const email = await User.findOne({ email: req.body.email });

    if (email) {
      res.status(400).send("This email is already exists");
    } else {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
      });

      const newUser = await user.save();

      const data = {
        user: {
          id: newUser._id,
        },
      };

      const authToken = jwt.sign(data, process.env.SECRET_KEY);
      console.log("authToken is : ")
      console.log(authToken);

      let success = true;

      return res.json({ newUser, authToken, success });
    }
  } catch (error) {
    return res.status(400).send(error);
  }
});

// fetching a new user

router.get("/fetchuser/:id", async (req, res) => {
  try {
    const usersData = await User.findById(req.params.id);

    res.status(200).json(usersData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// login the user
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    console.log();
    const verfiyPass = await bcryptjs.compare(req.body.password, user.password);

    console.log(verfiyPass);
    if (verfiyPass && user) {
      const data = {
        user: {
          id: user._id,
        },
      };

      const authToken = jwt.sign(data, process.env.SECRET_KEY);

      console.log(authToken);
      let success = true;
      res.json({ user, authToken, success });
    } else {
      res.status(400).json("invalid credentials");
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
