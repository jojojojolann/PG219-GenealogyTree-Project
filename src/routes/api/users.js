const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../../model/user');
const key = require('../../config/keys').secret;

/**
 * @route POST api/users/register
 * @desc Register the user
 * @access Public
 */
router.post('/register', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ msg: 'Email is already registered' });
      }
  
      // Check if this is the first user
      const userCount = await User.countDocuments({});
      const role = userCount === 0 ? 'admin' : 'user';
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create a new user
      const newUser = new User({ email, password: hashedPassword, role });
      await newUser.save();
  
      // Generate a token
      const payload = { _id: newUser._id, email: newUser.email, role: newUser.role };
      const token = jwt.sign(payload, key, { expiresIn: '24h' });
  
      res.status(201).json({
        success: true,
        user: newUser,
        token: `Bearer ${token}`,
        msg: 'User is now registered'
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server error' });
    }
  });

/**
 * @route POST api/users/login
 * @desc Login the user
 * @access Public
 */
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Wrong password' });
      }

      const payload = { _id: user._id, email: user.email, role: user.role };
      const token = jwt.sign(payload, key, { expiresIn: '24h' });

      res.status(200).json({
        success: true,
        user,
        token: `Bearer ${token}`,
        msg: 'You are now logged in'
      });
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  });

/**
 * @route PUT api/users/:email
 * @desc Promote user to admin
 * @access Private
 */
router.put('/promote/:email', async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({ email: req.params.email }, { role: 'admin' }, { new: true });

    if (!user) {
      return res.status(404).json({
        msg: 'User not found'
      });
    }

    return res.status(200).json({
      success: true,
      msg: 'User is now an admin',
      user
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      msg: 'Error while promoting the user'
    });
  }
});

/**
 * @route DELETE api/users/:email
 * @desc Delete user
 * @access Private
 */
router.delete('/delete/:email', async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ email: req.params.email });

    if (!user) {
      return res.status(404).json({
        msg: 'User not found'
      });
    }

    return res.status(200).json({
      success: true,
      msg: 'User is deleted',
      user
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      msg: 'Error while deleting the user'
    });
  }
});

/**
 * @route GET api/users/list
 * @desc Get all users
 * @access Private
 */
router.get('/list', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      msg: 'Error while getting the users'
    });
  }
});

module.exports = router;