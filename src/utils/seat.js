/**
 *  @param selfCoord 所选的坐标 { row: 2, column: 3 }  即三排第四座
 *  @param seatRow  当前一排座位的所有数据
 *  @param  selected 已选中的座位  [{row: 1, column: 2}]
 *  @param isCancel 是否是取消座位
 */
export const canSelect = (
  selfCoord = {},
  seatRow = [],
  selected = [],
  isCancel = false,
) => {
  const {row, column} = selfCoord;
  console.log(row, selected);

  const copySeatRow = seatRow.map((item, index) => index);

  const selectedSameRow = selected
    .filter(val => val.row === row)
    .map(item => item.column)
    .sort((a, b) => a - b);

  const availableSeats = getAvailable(seatRow, copySeatRow); // 获取所有可选座位的下标

  const splitAvailableSeat = splitArr(availableSeats); // 分割可选座位的下标 分成二维数组 [[1,2,3], [5]]

  let targetAvailableAreaIndex = 0; //  即可选二维数组的下标值 如以上的 [[1,2,3], [5]] 如用户选择5座位 则此值为1

  let targetSelectIndex = -1; // 将要选座的下标值，即 [5] 的下标为 0

  splitAvailableSeat.map((item, index) => {
    const exist = item.findIndex(val => val === column);
    if (exist >= 0) {
      targetAvailableAreaIndex = index;
      targetSelectIndex = exist;
    }
  });

  console.log(
    targetAvailableAreaIndex,
    targetSelectIndex,
    selectedSameRow,
    splitAvailableSeat,
  );

  const res = getTrgetSelect(
    selectedSameRow,
    splitAvailableSeat,
    targetAvailableAreaIndex,
  );
  // 在即将选中的区块中的已选中位置
  const targetSelectArea = splitAvailableSeat[targetAvailableAreaIndex]; // 将要选的区块 即 [5]
  console.log(targetSelectArea, column, res);
  const targetSelectAreaLength = targetSelectArea.length;

  if (isCancel) {
    // 取消座位逻辑
    // 区块中只有两个位置时的情况，可任意取消
    if (targetSelectAreaLength <= 2) {
      console.log('可以');
      return true;
    }

    const targetSelect = res.filter(val => val !== column); // 假设先取消该座位
    const leftData = [];

    // 获取剩余 未选座位 的下标集合
    targetSelectArea.map(item => {
      if (targetSelect.findIndex(val => item === val) < 0) {
        leftData.push(item);
      }
    });

    const splitLeftData = splitArr(leftData); // 同上分割 未选座位
    const splitSelectData = splitArr(res); // 分割已选座位
    console.log(splitLeftData, 'splitLeftDatasplitLeftDatasplitLeftData');
    console.log(
      splitSelectData,
      'splitSelectDatasplitSelectDatasplitSelectDatasplitSelectDatasplitSelectData',
    );
    // 区块中有三个位置的情况
    if (targetSelectAreaLength === 3) {
      // 代表剩余的空位超过一个
      if (splitLeftData.length > 1) {
        console.log('代表剩余的空位超过一个不可以');
        return false;
      }
      // 代表取消中间座位 (左右侧有空位是可以取消的)
      if (targetSelectArea[1] === column && splitLeftData?.length > 1) {
        console.log('代表取消中间座位不可以');
        return false;
      }
      console.log('可以');
      return true;
    }
    console.log(
      splitSelectData,
      'splitSelectDatasplitSelectDatasplitSelectDatasplitSelectData',
    );
    for (let i = 0; i < splitSelectData.length; i++) {
      console.log(
        splitSelectData[i],
        i,
        'splitSelectDatasplitSelectDatasplitSelectDatasplitSelectData',
      );
      if (
        column === splitSelectData[i][0] ||
        column === splitSelectData[i][splitSelectData[i].length - 1]
      ) {
        // 从已选的座位两端可以取消
        console.log('可以');
        return true;
      }
    }
    console.log('不可以不可以');
    return false;
  }

  // 选位逻辑    举例可选座位[[1,2,3,4], [5,6], [7,8,9]]

  // 区块长度为2 可以任意选择 即用户选择了[5,6]中的任意一个
  if (targetSelectAreaLength <= 2) {
    console.log('可以');
    return true;
  }

  // 用户选择[7,8,9]中的一个座位
  if (targetSelectAreaLength === 3) {
    if (res.length > 0) {
      // 判断[7,8,9]中是否已有选取的座位
      res.push(column);
      res.sort((a, b) => a - b);

      // 判断是否是有序选择 正序与倒序都视为有序
      const isOrderlyData = isOrderly(
        targetSelectArea,
        res,
        res[0] !== targetSelectArea[0],
      );
      if (isOrderlyData) {
        console.log('可以');
        return true;
      }
      console.log('不可以');
      return false;
    }

    // 选取了[7,8,9]的 8
    if (targetSelectArea[1] === column) {
      console.log('不可以');
      return false;
    }
    console.log('可以');
    return true;
  }

  console.log(res, 'resresresres');

  // 此时区块长度超过3 即[1,2,3,4]区块中选择位置
  if (res.length === 0) {
    // 未有选取的情况
    if (column === targetSelectArea[0]) {
      // 从左边第一个
      console.log('可以');
      return true;
    }
    if (column === targetSelectArea[targetSelectArea.length - 1]) {
      // 从右边第一个
      console.log('可以');
      return true;
    }
    if (
      column - targetSelectArea[0] > 1 &&
      targetSelectArea[targetSelectArea.length - 1] - column > 1
    ) {
      // 大于左边两格 小于右边两格
      console.log('可以');
      return true;
    }
    console.log('不可以');
    return false;
  }
  res.push(column);
  res.sort((a, b) => a - b);

  // 用户之前是否是有序选择
  const isOrderlyData = isOrderly(
    targetSelectArea,
    res,
    res[0] !== targetSelectArea[0],
  );
  if (!isOrderlyData) {
    // 不是有序选择
    // 是否选取到最后一个值
    const leftData = [];
    targetSelectArea.map(item => {
      if (res.findIndex(val => item === val) < 0) {
        leftData.push(item);
      }
    });
    const splitLeftData = splitArr(leftData);
    for (let i = 0; i < splitLeftData.length; i++) {
      const current = splitLeftData[i];
      if (current.length < 2) {
        console.log('不可以');
        return false;
      }
    }
  }
  console.log('可以');
  return true;
};

// 分割二维数组 将连续的数字合为一个数组， 返回参照 [[1,2,3], [5,6], [7]]
const splitArr = arr => {
  return arr
    .reduce((newArr, value, index) => {
      if (newArr.length && value - newArr[0][0] === 1) {
        newArr[0].unshift(value);
      } else {
        newArr.unshift([value]);
      }
      return newArr;
    }, [])
    .reverse()
    .map(a => a.reverse());
};

// 获取所有课选的位置 返回一个数组集合
const getAvailable = (seatRow, targetRow) => {
  const arr = [];
  for (let i = 0; i < targetRow.length; i++) {
    const current = targetRow[i];
    if (seatRow[current]) {
      if (
        seatRow[current].status === 'Available' ||
        seatRow[current].status === 'Yellow'
      ) {
        arr.push(current);
      }
    }
  }
  return arr;
};

// 获取将要点击的座位的在所可选区块中的区块
const getTrgetSelect = (
  selectedSameRow,
  splitAvailableSeat,
  targetAvailableAreaIndex,
) => {
  const targetSelect = [];
  if (selectedSameRow.length > 0) {
    const targetData = splitAvailableSeat[targetAvailableAreaIndex];
    targetData.map(item => {
      selectedSameRow.map(val => {
        if (val === item) {
          targetSelect.push(val);
        }
      });
    });
  }
  return targetSelect;
};

// 判断数组是否是有序数组
const isOrderly = (arr, targetArr, isReverse = false) => {
  const arrLength = arr.length;
  const targetArrLength = targetArr.length;
  const targetStr = targetArr.join('');
  const reslut = [];
  if (isReverse) {
    const startIndex = arr.findIndex(val => val === targetArr[0]);
    for (let i = startIndex; i < arrLength; i++) {
      reslut.push(arr[i]);
    }
  } else {
    for (let i = 0; i < targetArrLength; i++) {
      reslut.push(arr[i]);
    }
  }
  const resultStr = reslut.join('');
  return targetStr === resultStr;
};
