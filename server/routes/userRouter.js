const router = require('express').Router();
const passport = require('passport');

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
router.post(
  '/login/facebook',
  passport.authenticate('facebook-token', { session: false }),
  authController.login_facebook
);

//
//  USERS PATHS
//

router.get('/', userController.all_users);

// GET Returns every friend of the user logged in (for the timeline).
router.get('/all_friends', authorizeUser, userController.all_friends_self);

// GET Returns every friend of an specific user.
router.get('/all_friends/:id', authorizeUser, userController.all_friends_another);

// PUT Accepts and id from the user you want to send the request to, returns the user with the friendRequests array updated.
router.put('/friend_request/:id', authorizeUser, userController.friend_request);

// PUT Accepts an id from the user that sent the request, and a status of accepted or not, returns the user with the friend added or the request removed.
router.put('/handle_request/:id', authorizeUser, userController.handle_request);

module.exports = router;
