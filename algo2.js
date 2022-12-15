const arr1 = ['x', 'y', 'z'];
const arr2 = ['a', 'b', 'c'];
const arr3 = ['v', 'w', 'x'];

const findSame = function (array1, array2) {
  let map = {};
  for (let i = 0; i < array1.length; i++) {
    map[array1[i]] = i;
  }
  for (let i = array1.length; i < array2.length + array1.length; i++) {
    if (map[array2[i - array1.length]] === undefined) {
      map[array2[i - array1.length]] = i;
      console.log(map);
    } else {
      return true;
    }
  }
  return false;
};

console.log(findSame(arr1, arr3));
