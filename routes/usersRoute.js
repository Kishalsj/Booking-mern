const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = new User({ name, email, password });

  try {
    await newUser.save();
    res.send('User Registered Successfully');
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (user) {

                const temp = {
                    name : user.name,
                    email : user.email,
                    isAdmin : user.isAdmin,
                    _id : user._id,
                }

      res.send(temp);
    } else {
      return res.status(400).json({ message: 'Login Failed' });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});


router.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    return res.status(400).json({ error: "Failed to fetch users" });
  }
});


module.exports = router;
