const mergeAndSort = (arr1, arr2) => {
  const arr1Formated = formatDates(arr1);
  const arr2Formated = formatDates(arr2);
  const mergeArr = [...arr1Formated, ...arr2Formated];
  const sortedArr = mergeArr.sort((a, b) =>
    a.createdAt > b.createdAt ? -1 : 1
  );
  return sortedArr;
};

const formatDates = (arr) => {
  return arr.map((val) => {
    const dayAndTime = val.createdAt.split('T');
    const time = dayAndTime[1].split('.');
    val.createdAt = `${dayAndTime[0]} at ${time[0]}`;
    return val;
  });
};

module.exports = {mergeAndSort, formatDates};
