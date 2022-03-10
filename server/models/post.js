const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var postSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    text: { type: String, required: true },
    attached_image: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
