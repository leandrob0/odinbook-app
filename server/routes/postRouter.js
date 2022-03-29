const router = require('express').Router();

const authorizeUser = require('../middleware/authorizeUser');
const postController = require('../controllers/postController');

// POST Creates a new post and returns it.
router.post('/new_post', authorizeUser, postController.create_post);

// GET Returns all posts from friends and self.
router.get('/timeline', authorizeUser, postController.timeline_posts);

// POST Updates the likes on a post, returns the post.
router.put('/like/:id', authorizeUser, postController.like_post);

// GET Returns all posts from an id.
router.get('/:id', authorizeUser, postController.self_posts);

module.exports = router;
