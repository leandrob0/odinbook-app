const router = require('express').Router();

const authorizeUser = require('../middleware/authorizeUser');
const postController = require('../controllers/postController');

// POST Creates a new post and returns it.
router.post('/new-post', authorizeUser, postController.create_post);

// GET Returns all posts from friends.
router.get('/timeline', authorizeUser, postController.friends_posts)

module.exports = router;
