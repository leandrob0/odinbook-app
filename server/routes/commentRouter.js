const router = require('express').Router();

const authorizeUser = require('../middleware/authorizeUser');
const commentController = require('../controllers/commentController');

// POST Creates a new comment for the postId passed in the params, returns the post with the comments updated.
router.post('/new/:id', authorizeUser, commentController.create_comment);

// PUT Updates the like count of a comment.
router.put('/like/:id', authorizeUser, commentController.like_comment);

module.exports = router;