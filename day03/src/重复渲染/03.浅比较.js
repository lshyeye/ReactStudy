const obj1 = {
  name: '张三',
  age: 18,
  goddess: {
    0: '迪丽热巴',
  },
};
const obj2 = {
  name: '李四',
  height: 180,
  weight: 140,
  goddess: {
    1: '古力娜扎',
  },
};

// 合并

const target = Object.assign(obj1, obj2);
console.log(target);
/* 
执行结果：相同属性的时候后面会覆盖前面的内容 Object.assign(obj1, obj2) 进行比较，
         1. 如果属性名是相同的，后面对象直接覆盖前面对象
         2. 如果是相同的属性名是引用数据类型，直接使用后面的数据覆盖前面的数据（不会进行比较引用类型的值是否相同）
         只比较第一层，第一层就是浅比较
{
  name: '李四',
  age: 18,
  goddess: { '1': '古力娜扎' },
  height: 180,
  weight: 140
}
*/
