const User = require('../models/user');
//const { body, validationResult } = require('express-validator');

exports.all_users = async (req, res) => {
    const users = await User.find({});
    res.status(200).json({users});
}