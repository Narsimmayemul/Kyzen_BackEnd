// routes/signup.js
const express = require('express');
const router = express.Router();
const db = require('../models'); // Adjust the path as necessary
const bcrypt = require('bcrypt');

// Signup route
router.post('/', async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ error: 'Username, password, and email are required' });
  }

  try {
    
    const existingUser = await db.User.findOne({ where: { username } });
    const existingEmail = await db.User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken' });
    }
    if (existingEmail) {
      return res.status(400).json({ error: 'Email alredy exist' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.User.create({ username, password: hashedPassword, email });

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
