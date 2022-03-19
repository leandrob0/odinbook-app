export const addFullname = (arr) => {
  let newArr = arr.map((user) => {
    user.fullname = user.first_name + ' ' + user.last_name;
    return user;
  });

  return newArr;
};
