const router = require('express').Router();

const authorizeUser = require('../middleware/authorizeUser');
//const commentController = require('../controllers/commentController');

router.post('/new/:id', authorizeUser);

module.exports = router;