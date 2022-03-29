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

  async (req, res) => {
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

      await post.save();
      const newPost = await Post.find({ author: post.author }).populate(
        'author'
      );
      res.status(201).json({ post: newPost });
    }
  },
];

exports.self_posts = async (req, res) => {
  const posts = await Post.find({ author: req.params.id }).populate('author').populate('likes').populate('comments');

  // I pass it an empty array, because this function merges two arrays and does the rest.
  // So if i pass an empty array, the original one wont change.
  const allPostsSortedAndDateFormated = mergeAndSort(posts, []);

  res.status(200).json({ posts: allPostsSortedAndDateFormated });
};

exports.timeline_posts = async (req, res) => {
  const friends = await User.find({ friends: req.user._id });
  const postsFromSelf = await Post.find({ author: req.user._id }).populate(
    'author'
  ).populate('likes').populate('comments');
  const promises = friends.map(async (friend) => {
    const posts = await Post.find({ author: friend._id }).populate('author').populate('likes').populate('comments');
    return posts;
  });
  const friendsPosts = await Promise.all(promises);

  const allPostsSortedAndDateFormated = mergeAndSort(
    friendsPosts,
    postsFromSelf
  );

  res.status(200).json({ posts: allPostsSortedAndDateFormated });
};

exports.like_post = async (req, res) => {
  const post = await Post.findById(req.params.id).populate('likes');
  const postCopy = post;
  postCopy.likes = postCopy.likes.concat(req.user._id);

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, postCopy, {
    new: true,
  }).populate('likes');
  res.status(200).json({ post: updatedPost });
};
