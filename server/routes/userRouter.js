const router = require('express').Router();

const authController = require('../controllers/authController');

// POST Registers a new user.
router.post('/register', authController.register);

// POST Logs in a new user with the local, jwt method.
router.post('/login/local', authController.login_jwt);

module.exports = router;
