const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const passport = require('passport');

exports.register = [
  // Sanitize data.
  body('first_name', 'Firstname must be inserted')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('last_name', 'Lastname must be inserted')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('email').trim().escape(),
  body('password').trim().escape(),

  async (req, res, next) => {
    // Gets the hashed password and searchs if the inserted username exists already
    const pw = await bcrypt.hash(req.body.password, 10);
    const foundEmail = await User.findOne({ email: req.body.email });

    const errors = validationResult(req);

    if (!errors.isEmpty() || foundEmail) {
      res.status(400).json({
        errors: errors.array(),
        msg: foundEmail
          ? 'The email already has an account linked to it'
          : 'The email or password are invalid.',
      });
    } else {
      const user = new User({
        email: req.body.email,
        password: pw,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        profile_pic: 'public/images/blank_profile_picture.png',
        friends: [],
        friendRequests: [],
      });

      user.save((err) => {
        if (err) return next(err);
        res.status(201).json({ msg: 'User registered succesfully!' });
      });
    }
  },
];

exports.login_local = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(403).json({
        msg: info.message,
      });
    }

    req.login(user, { session: false }, (err) => {
      if (err) return next(err);
      // create token
      const token = jwt.sign({ user }, process.env.SECRET_KEY, {
        expiresIn: '1d',
      });

      user = user.toObject();
      delete user.password;
      return res.status(200).json({ user, token });
    });
  })(req, res, next);
};

exports.login_facebook = (req, res, next) => {
  passport.authenticate('facebook', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(403).json({
        msg: info.message,
      });
    }

    req.login(user, { session: false }, (err) => {
      if (err) return next(err);
      // create token
      const token = jwt.sign({ user }, process.env.SECRET_KEY, {
        expiresIn: '1d',
      });

      return res.status(200).json({ user, token });
    });
  })(req, res, next);
};
