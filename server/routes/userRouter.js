const router = require('express').Router();

const authController = require('../controllers/authController');

// POST Registers a new user.
router.post('/register', authController.register);

// POST Logs in a new user with the local, jwt method.
router.post('/login/local', authController.login_local);

// POST Logs in a new user with the facebook method.
router.post('/login/facebook', authController.login_facebook);

module.exports = router;
