const array = [2, 5, 1, 2, 3, 9, 5, 1, 2, 4];

const number = function (nums) {
  let num;
  let obj = {};
  for (let i = 0; i < nums.length; i++) {
    if (obj[nums[i]] !== undefined) {
      console.log(i, obj);
      num = nums[i];
      break;
    } else {
      obj[nums[i]] = i;
      console.log('N', i, obj);
    }
  }
  return num;
};

console.log(number(array));
