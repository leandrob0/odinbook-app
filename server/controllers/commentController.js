const Post = require('../models/post');
const User = require('../models/user');
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

    const newComment = await comment.save();

    // Now updates the posts
    // First get the post where you want a new comment.
    const postOfTheNewComment = await Post.findById(req.params.id);
    // Updates the comments array.
    postOfTheNewComment.comments = postOfTheNewComment.comments.concat(
      newComment._id
    );
    // Updates it in the db.
    const postUpdated = await Post.findByIdAndUpdate(
      req.params.id,
      postOfTheNewComment,
      { new: true }
    )
      .populate('author')
      .populate('likes')
      .populate({
        path: 'comments',
        populate: { path: 'author', model: User },
      });

    // Returns the post with the new comment added, and every field needed.
    res.status(200).json({ post: postUpdated });
  }
};

exports.like_comment = async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  let found = 0;

  comment.likes.forEach(like => {
    if(like.toHexString() === req.user._id.toHexString()) {
      found = 1;
    } 
  })

  if(found) {
    comment.likes = comment.likes.filter(id => id.toHexString() !== req.user._id.toHexString());
  } else {
    comment.likes = comment.likes.concat(req.user._id);
  }

  await Comment.findByIdAndUpdate(req.params.id, comment);

  res.status(200).end();
};
