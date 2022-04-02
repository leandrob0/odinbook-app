const addNewUser = (allUsers, user, socketId) => {
  !allUsers.some((x) => x.email === user.email) &&
    allUsers.push({ user, socketId });
  return allUsers;
};

const getUser = (allUsers, email) => {
  return allUsers.find((user) => user.email === email);
};

module.exports = { addNewUser, getUser };
