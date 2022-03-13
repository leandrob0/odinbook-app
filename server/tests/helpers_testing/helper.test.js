const {mergeAndSort, formatDates} = require('../../helpers/mergeAndSort');

test('Function format the dates to YYYY-mm-dd at hh:mm:ss', () => {
  const arr1 = [
    { createdAt: '2022-02-27T00:22:53.902Z' },
    { createdAt: '2022-02-27T00:22:52.836Z' },
  ];

  const result = formatDates(arr1);

  expect(result[0].createdAt).toEqual('2022-02-27 at 00:22:53')
  expect(result[1].createdAt).toEqual('2022-02-27 at 00:22:52')
});

test('Function merges array and sorts them from oldest to most recent', () => {
  const arr1 = [
    { createdAt: '2022-02-27T00:22:53.902Z' },
    { createdAt: '2022-02-27T00:22:52.836Z' },
    { createdAt: '2022-02-27T00:22:51.701Z' },
    { createdAt: '2022-01-27T00:22:50.902Z' },
  ];
  const arr2 = [
    { createdAt: '2022-02-26T23:28:54.264Z' },
    { createdAt: '2022-01-23T00:22:53.134Z' },
    { createdAt: '2022-02-27T00:22:49.701Z' },
  ];

  const result = mergeAndSort(arr1, arr2);

  expect(result).toHaveLength(arr1.length + arr2.length);
  expect(result[0].createdAt).toEqual('2022-02-27 at 00:22:53');
  expect(result[result.length - 1].createdAt).toEqual('2022-01-23 at 00:22:53');
});
