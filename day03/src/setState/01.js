const obj1 = {
  name: 'why',
};
const obj2 = {
  name: 'yep',
};

console.log(obj1 === obj2); //false 判断地址是否一致

const obj3 = obj1; // 把 obj1 的地址赋值给 obj3
console.log(obj3 === obj1);

const arry = [1, 2, 3];
arry.push(4); // 在原地址上进行操作
console.log(arry);
