const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');

router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await db.User.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send('Invalid credentials');
    }
    const token = jwt.sign({ id: user.id }, 'narsimma');
    res.status(200).json({ token , user});
    console.log(username , password);
  } catch (error) {

    res.status(500).send(error.message);
  }
});

module.exports = router;
