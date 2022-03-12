const Post = require('../models/post');
const User = require('../models/user');
const { body, validationResult } = require('express-validator');

exports.create_post = [
  body('text', 'Posts text must be at least 1 character long')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        error: errors.array(),
      });
    } else {
      const post = new Post({
        author: req.user._id,
        comments: [],
        likes: [],
        text: req.body.text,
      });

      post.save((err) => {
        if (err) return next(err);
        res.status(201).json({ post: post });
      });
    }
  },
];

exports.friends_posts = async (req, res) => {
  const friends = await User.find({ friends: req.user._id });
  const postsFromSelf = await Post.find({ author: req.user_id }).populate('author');
  const promises = friends.map(async (friend) => {
    const posts = await Post.find({ author: friend._id }).populate('author');
    return posts;
  });
  const friendsPosts = await Promise.all(promises);

  res
    .status(200)
    .json({ friendsPosts: friendsPosts, selfPosts: postsFromSelf });
};
