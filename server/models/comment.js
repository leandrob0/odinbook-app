const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var commentSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    text: { type: String, required: true },
});

module.exports = mongoose.model('Comment', commentSchema);