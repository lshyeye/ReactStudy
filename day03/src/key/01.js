const arr = [1, 2, 3, 4, 5];
// 尽量避免头部删除和添加元素，后面的元素都要发生位移
arr.unshift(0);
console.log(arr);
