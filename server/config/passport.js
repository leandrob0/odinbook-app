const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const FacebookTokenStrategy = require('passport-facebook-token');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require('bcryptjs');
const User = require('../models/user');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (email, password, done) => {
      User.findOne({ email: email })
        .select('+password')
        .exec((err, user) => {
          if (err) return done(err);
          if (!user) return done(null, false, { message: 'Incorrect email' });
          // Compares the password passed in the login form, with the hashed and salted one in the db.
          bcrypt.compare(password, user.password, (err, res) => {
            // Error on the operation.
            if (err) return done(err);
            // The passwords don't match
            if (!res)
              return done(null, false, { message: 'Incorrect password' });
            // The passwords match, everything ok.
            return done(null, user);
          });
        });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
      passReqToCallback: true,
    },
    (req, jwtPayload, cb) => {
      //find the user in db.
      User.findById(jwtPayload.user._id)
        .then((user) => {
          req.user = user;
          return cb(null, user);
        })
        .catch((err) => {
          return cb(err);
        });
    }
  )
);

passport.use(
  new FacebookTokenStrategy(
    {
      clientID: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      fbGraphVersion: 'v3.0'
    },
    function (accessToken, refreshToken, profile, done) {
      // User could not have an email associated to its account, so we return an error.
      console.log(profile);
      if (!profile._json.email) {
        return done(null, false, {
          message:
            'Facebook account doens\'t have an email associated, please log in using other methods',
        });
      }
      User.findOrCreate(
        { email: profile._json.email },
        {
          first_name: profile._json.first_name,
          last_name: profile._json.last_name,
          email: profile._json.email,
          profilePicUrl: profile.photos[0].value,
          friends: [],
          posts: [],
          friendRequests: [],
        },
        function (error, user) {
          return done(error, user);
        }
      );
    }
  )
);

module.exports = passport;
