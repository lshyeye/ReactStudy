/* 
  需求：
  超时搞活动所有新用户赠送 10000 积分

*/

// 新用户
function newUser(account) {
  // const account = 10000;
  console.log(`新用户积分：${account}`);
}

// vip用户
function vipUser(account) {
  // const account = 10000;
  console.log(`vip用户积分：${account}`);
}
// newUser();
// vipUser();

/* 
  两个函数中有代码一样的部分，就是代码冗余
  使用中间函数，读取 account ，负责把 account 传递给两个函数
  中间函数接受一个函数作为参数，同时返回一个函数 负责处理相同的逻辑

*/

// 高阶函数
function warpWithAccount(fn) {
  return function () {
    const account = 10000;
    fn(account);
  };
}

const warpNewUser = warpWithAccount(newUser);
const warpVipUser = warpWithAccount(vipUser);

warpNewUser();
warpVipUser();

// 增加一个 svipUser

function sVipUser(account) {
  // const account = 10000;
  console.log(`svip用户积分：${account}`);
}
const warpsvipUser = warpWithAccount(sVipUser);
warpsvipUser();
