const mergeAndSort = (arr1, arr2) => {
  const mergeArr = [...arr1, arr2];
  const sortedArr = mergeArr.sort((a, b) =>
    a.createdAt > b.createdAt ? -1 : 1
  );
  return sortedArr;
};

module.exports = mergeAndSort;
