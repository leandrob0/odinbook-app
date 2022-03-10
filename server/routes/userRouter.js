const router = require('express').Router();

const authorizeUser = require('../middleware/authorizeUser');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

//
//  AUTH PATHS
//

// POST Registers a new user.
router.post('/register', authController.register);

// POST Logs in a new user with the local, jwt method.
router.post('/login/local', authController.login_local);

// POST Logs in a new user with the facebook method.
router.get('/login/facebook', authController.login_facebook);

//
//  USERS PATHS
//

router.get('/all', authorizeUser, userController.all_users);

module.exports = router;
