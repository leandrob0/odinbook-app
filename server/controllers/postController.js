const Post = require('../models/post');
const User = require('../models/user');
const upload = require('../config/multer');
const { body, validationResult } = require('express-validator');
const { mergeAndSort } = require('../helpers/mergeAndSort');

exports.create_post = [
  upload.single('file'),

  body('text', 'Posts text must be at least 1 character long')
    .trim()
    .isLength({ min: 1 })
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        msg: errors.array(),
      });
    } else {
      const post = new Post({
        author: req.user._id,
        comments: [],
        likes: [],
        text: req.body.text,
        attached_image: req.file ? req.file.path : undefined,
      });

      post.save((err) => {
        if (err) return next(err);
        res.status(201).json({ post: post });
      });
    }
  },
];

exports.timeline_posts = async (req, res) => {
  const friends = await User.find({ friends: req.user._id });
  const postsFromSelf = await Post.find({ author: req.user_id }).populate(
    'author'
  );
  const promises = friends.map(async (friend) => {
    const posts = await Post.find({ author: friend._id }).populate('author');
    return posts;
  });
  const friendsPosts = await Promise.all(promises);

  const allPostsSortedAndDateFormated = mergeAndSort(
    friendsPosts,
    postsFromSelf
  );

  res.status(200).json({ posts: allPostsSortedAndDateFormated });
};
