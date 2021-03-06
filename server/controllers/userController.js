const mongoose = require('mongoose');
const upload = require('../config/multer');
const User = require('../models/user');

// This will work for the searching later, probably will have an state that saves the users for searching.
exports.all_users = async (req, res) => {
  let users = await User.find({}, 'first_name last_name profile_pic');
  res.status(200).json({ users });
};

exports.requests = async (req, res) => {
  const requests = await User.findById(req.user._id, 'friendRequests').populate(
    'friendRequests'
  );
  res.status(200).json({ requests });
};

exports.friend_request = async (req, res) => {
  const id = req.params.id;
  // Searches for the friend that i want to add.
  const friend = await User.findById(id);

  // Verify that the user are not already friends. Verify that the user did not sent a request already.
  const foundFriend = friend.friends.findIndex(
    (idFriend) => idFriend.toHexString() === id
  );
  const foundRequest = friend.friendRequests.findIndex(
    (idFriend) => idFriend.toHexString() === req.user._id.toHexString()
  );

  if (foundRequest !== -1) {
    return res
      .status(400)
      .json({ msg: 'A friend request to this user was already sent.' });
  }

  if (foundFriend !== -1 || !friend)
    return res.status(404).json({
      msg:
        'The user ' +
        friend.first_name +
        // eslint-disable-next-line quotes
        " is already your friend or doesn't exist.",
    });

  friend.friendRequests = friend.friendRequests.concat(req.user._id);
  // Update its friendRequests array with the id of the user that sent the request.
  const user = await User.findByIdAndUpdate(id, friend, {
    new: true,
  });
  res.status(200).json({
    msg: `Friend request sent succesfully to ${user.first_name} ${user.last_name}`,
  });
};

exports.handle_request = async (req, res) => {
  // The frontend will pass if the user accepted the request or not.
  const status = req.body.status;
  const requestHandled = req.params.id;

  if (status === undefined) {
    return res.status(404).json({
      msg: 'An acceptance status must be sent.',
    });
  }

  let userAccepting = await User.findById(req.user._id);
  let userSending = await User.findById(requestHandled);
  const findRequest = userAccepting.friendRequests.findIndex(
    (id) => id.toHexString() === requestHandled
  );
  // Didn't found the request on the user that is accepting it.
  if (findRequest === -1) {
    return res.status(406).json({
      msg: 'The user did not send a friend request or the request was canceled.',
    });
  }
  // The user that sent the request was deleted.
  if (!userSending) {
    return res.status(404).json({
      msg: 'The user from which you are trying to accept a request was deleted.',
    });
  }

  // Handles if the request was accepted or not.
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

  await User.findByIdAndUpdate(requestHandled, userSending);
  const newUserAccepting = await User.findByIdAndUpdate(
    req.user._id,
    userAccepting,
    { new: true }
  )
    .populate('friends')
    .populate('friendRequests');

  res.status(200).json({ user: newUserAccepting });
};

exports.info_by_id = async (req, res) => {
  const info = await User.findById(req.params.id).populate('friends');
  res.status(200).json({ info });
};

exports.change_photo = [
  upload.single('file'),

  async (req, res) => {
    if (!req.file) {
      res.status(400).json({ msg: 'A file must be sent,' });
    }

    req.user.profile_pic = '/' + req.file.path;

    const updatedUser = await User.findByIdAndUpdate(req.user._id, req.user, {
      new: true,
    });

    res.status(200).json({ user: updatedUser });
  },
];
