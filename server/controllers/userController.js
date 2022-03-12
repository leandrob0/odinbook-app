const mongoose = require('mongoose');
const User = require('../models/user');
//const { body, validationResult } = require('express-validator');

exports.all_users = async (req, res) => {
  const users = await User.find({});
  res.status(200).json({ users });
};

exports.friend_request = async (req, res) => {
  const id = req.body.id;
  // Searches for the friend that i want to add.
  const friend = await User.findById(id);

  // Verify that the friend request has not been sent before (is not on pending).
  const found = friend.find((val) => val._id.toHexString() === id);
  if (found)
    return res.status(404).json({
      msg: 'A request to ' + friend.first_name + ' was already sent.',
    });

  friend.friendRequests = friend.friendRequests.concat(req.user._id);
  // Update its friendRequests array with the id of the user that sent the request.
  const user = await User.findByIdAndUpdate(req.body.id, friend, {
    new: true,
  });
  console.log(user);
  res.status(200).json({
    msg: `Friend request sent succesfully to ${friend.first_name} ${friend.last_name}`,
  });
};

exports.handle_request = async (req, res) => {
  // The frontend will pass if the user accepted the request or not.
  const status = req.body.status;
  const requestHandled = req.body.id;

  if (!status || !requestHandled) {
    return res.status(404).json({
      msg: 'An acceptance and an id for the user that you want to handle are needed.',
    });
  }

  let userAccepting = await User.findById(req.user._id);
  let userSending = await User.findById(requestHandled);
  const findRequest = userAccepting.friendRequests.find(
    (id) => id.toHexString() === requestHandled
  );
  if (!findRequest) {
    return res
      .status(406)
      .json({ msg: 'The user did not send a friend request.' });
  }
  if (!userSending) {
    return res.status(404).json({
      msg: 'The user from which you are trying to accept a request was deleted.',
    });
  }

  // Handles if the request was accepted or not.
  // Probably want this to be in its own module.
  if (status) {
    // Updates both users friends array if accepted.
    userAccepting.friends = userAccepting.friends.concat(
      mongoose.Types.ObjectId(requestHandled)
    );
    userAccepting.friendRequests = userAccepting.friendRequests.filter(
      (id) => id.toHexString() !== requestHandled
    );
    userSending.friends = userSending.friends.concat(req.user._id);
  } else {
    userAccepting.friendRequests = userAccepting.friendRequests.filter(
      (id) => id.toHexString() !== requestHandled
    );
  }

  const newUserSending = await User.findByIdAndUpdate(
    req.body.id,
    userSending,
    {
      new: true,
    }
  );
  const newUserAccepting = await User.findByIdAndUpdate(
    req.user._id,
    userAccepting,
    { new: true }
  );
  res.status(200).json({ users: [newUserAccepting, newUserSending] });
};
