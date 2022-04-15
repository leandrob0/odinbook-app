const passport = require('passport');

const authorizeUser = (req, res, next) => {
  passport.authenticate(['jwt','facebook-token'], { session: false }, (error, token) => {
    req.user = (token.doc ? token.doc : token);
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
