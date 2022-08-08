const express = require('express');
const router = express.Router();
const { UsersBase } = require('../models')  
const bcrypt = require('bcryptjs');
const { sign } = require("jsonwebtoken")
const { validateToken } = require("../middlewares/authMiddleware")

router.post('/registration', async (req, res) => {
  const { 
    name,
    email,
    password,
  } = req.body;

  const isExiting = await UsersBase.findOne({ where: { email: email }})

  if(isExiting) {
    return res.json({ error: "User is allready exiting" });
  }
  const passHash = await bcrypt.hash(password, 10);
  const newUser = await UsersBase.create({
      name: name,
      email: email,
      password: passHash,
      status: "Unlocked",
      lastLoginTime: 'Never'
    });
  res.json(newUser)
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await UsersBase.findOne({ where: { email: email}});
  if(!user) {
    return res.json({ error: "User not exist" });
  }
  if(user.status === "Blocked") {
    return res.json({ error: "This account is blocked" });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.json({ error: "Wrong Username or Password" });
  }
  const date = new Date;
  await UsersBase.update({
    lastLoginTime: date.toDateString()
    }, {
    where: { email: email }
    }
  )
  const accessToken = sign({ email: user.email, id: user.id }, "mySecret");
  return res.json({ token: accessToken, email: email, id: user.id });
})

router.get('/auth', validateToken, (req, res) => {
  res.json(req.email)
})

module.exports = router;