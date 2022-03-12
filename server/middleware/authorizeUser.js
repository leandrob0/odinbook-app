const passport = require('passport');

const authorizeUser = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, token) => {
    if (error) {
      return res.status(403).json({ msg: 'Token expired' });
    }
    if (!token) {
      return res.status(400).json({ msg: 'Token invalid or missing' });
    }
    next();
  })(req, res, next);
};

module.exports = authorizeUser;
