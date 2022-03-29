const Post = require('../models/post');
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
      .populate('comments');

    // Returns the post with the new comment added, and every field needed.
    res.status(200).json({ post: postUpdated });
  }
};

exports.like_comment = async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  for (let like in comment.likes) {
    if (like === req.user._id) {
      return res
        .status(400)
        .json({ msg: 'The user already liked that comment.' });
    }
  }

  comment.likes = comment.likes.concat(req.user._id);
  await Comment.findByIdAndUpdate(req.params.id, comment);
};
