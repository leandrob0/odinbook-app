const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    profile_pic: { type: String },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    friendRequests: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('User', userSchema);
