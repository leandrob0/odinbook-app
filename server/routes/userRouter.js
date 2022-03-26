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

// GET Returns every user for the search.
router.get('/', authorizeUser, userController.all_users);

// GET Returns all the info from the specified user (for the profile page).
router.get('/info/:id', authorizeUser, userController.info_by_id);

// PUT Accepts and id from the user you want to send the request to, returns the user with the friendRequests array updated.
router.put('/friend_request/:id', authorizeUser, userController.friend_request);

// PUT Accepts an id from the user that sent the request, and a status of accepted or not, returns the user with the friend added or the request removed.
router.put('/handle_request/:id', authorizeUser, userController.handle_request);

module.exports = router;
