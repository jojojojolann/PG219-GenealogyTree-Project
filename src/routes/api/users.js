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
    let { email, password } = req.body;

    try {
        // First user = admin
        const count = await User.countDocuments({});
        let role = 'user';
        if (count === 0) {
            role = 'admin';
        }

        // Already exist ?
        User.findOne({ email }).then(user => {
            if (user) {
                return res.status(400).json({
                    msg: 'Email is already registered'
                });
            }
        });

        // Register the user
        let newUser = new User({
            email,
            password,
            role
        });
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) {
                    return res.status(400).json({
                        msg: 'Error while hashing the password'
                    });
                }
                newUser.password = hash;
                newUser.save().then(user => {
                    return res.status(201).json({
                        success: true,
                        msg: 'User is now registered'
                    });
                });
            });
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: 'Internal server error'
        });
    };
});


/**
 * @route POST api/users/login
 * @desc Login the user
 * @access Public
 */
router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: 'User not found'
            });
        }
        bcrypt.compare(req.body.password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    _id: user._id,
                    email: user.email
                }
                jwt.sign(payload, key, {
                    expiresIn: '24h'
                }, (err, token) => {
                    res.status(200).json({
                        success: true,
                        user: user,
                        token: `Bearer ${token}`,
                        msg: 'You are now logged in'
                    });
                });
            } else {
                return res.status(404).json({
                    success: false,
                    msg: 'Wrong password'
                });
            }
        });
    })
});

/**
 * @route GET api/users/profile
 * @desc User's profile
 * @access Private
 */
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({
        user: req.user
    });
});

/**
 * @route DELETE api/users/:id
 * @desc Delete a user
 * @access Private
 */
router.delete('/user/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            msg: 'You are not authorized to do this'
        });
    }

    try {
        User.findOneAndDelete({ _id: req.params.id }).then(user => {
            res.status(200).json({
                success: true,
                msg: 'User is deleted'
            });
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        });
    }
});

/**
 * @route GET api/users/all
 * @desc Get all users
 * @access Private
 */
router.get('/all', passport.authenticate('jwt', { session: false }), (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            msg: 'You are not authorized to do this'
        });
    }

    User.find({})
    .select('-password')
    .then(users => {
        return res.status(200).json({
            success: true,
            users: users
        });
    })
    .catch(err => {
        return res.status(500).json({
            success: false,
            msg: 'Internal server error'
        });
    });
});

module.exports = router;