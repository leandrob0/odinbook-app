//const Post = require('../models/post');
const Comment = require('../models/comment');

exports.create_comment = async (req, res) => {
  if (!req.body.text) {
    return res.status(400).json({ msg: 'The comment must not be empty.' });
  } else {
    // Create the new comment and save it.
    const comment = new Comment({
      author: req.user._id,
      text: req.body.text,
      likes: [],
    });

    await comment.save();

    // Now updates the posts
  }
};
