# 受控组件与高阶组件

## 1.ref

需求：两个兄弟元素，一个 div，一个是 button

```jsx
button.onclick = function () {
  document.getElementById('xxx').style.background = 'red';
};
```

在 Vue，React 中页面元素都是动态生成的，没有办法使用 DOM API

我们在 React 中，大部分操作的都是 React 元素，不是 DOM 元素，不建议直接操作 DOM 元素

ref 属性，用于访问在 render 方法中创建的 DOM 元素或者 React 元素

但是要谨慎使用 ref，如果能使用属性和状态进行控制，就不要使用 ref

```jsx
import React, { PureComponent, createRef } from 'react';

class Header extends PureComponent {
  constructor() {
    super();
    this.state = {
      name: '张三',
    };
  }
  render() {
    return <h2>Header</h2>;
  }
}

export default class App extends PureComponent {
  /* 
   1. 创建一个 Ref 对象 
   2. createRef() 创建 ref 对象，并通过 ref 属性添加至 React 元素上
   3. 通常我们在构造函数中，将 ref 分配给实例属性，可以方便的在组件中使用
   4. 注意函数组件无法使用ref，因为函数组件没有实例
   */
  constructor() {
    super();
    this.input = createRef();
    this.header = createRef();
    this.userRefs = createRef();
  }
  componentDidMount() {
    // 获取焦点
    this.input.current.focus();
  }

  changeText = () => {
    console.log('这是 this.input：', this.input); //{current: input}
    console.log('这是 this.input.current：', this.input.current); //<input type="text">
    // console.log('这是 this.header：', this.header.current);
    // ref 是一个对象实例，它有一个 current 属性，用于获取 DOM 元素和保存变化的值
    // console.log(this.header.current.state.name); //张三
    // 修改 h2 中的值文字 text，将 input 的输入值赋给 h2标签
    this.userRefs.current.innerHTML = this.input.current.value;
  };
  render() {
    return (
      <div className='App'>
        {/* ref 如果用在组件上，获取到组件的实例对象 */}
        <Header ref={this.header} />
        <h2 ref={this.userRefs}>h2标签</h2>
        {/* 一进入页面，input输入框就可以获得焦点 */}
        <input type='text' ref={this.input}></input>
        <button onClick={this.changeText}>按钮</button>
      </div>
    );
  }
}
```

React 里面思维方式：不要强制去修改 DOM ，而是通过 props、state 重新渲染组件

Ref 转发：

```jsx
import React, { PureComponent, createRef, forwardRef } from 'react';

const FocusInput = forwardRef(function (props, ref) {
  return <input type='text' ref={ref} />;
});

export default class App extends PureComponent {
  constructor() {
    super();
    this.input = createRef();
  }
  // 进入页面就获取焦点
  componentDidMount() {
    this.input.current.focus();
  }
  render() {
    return (
      <div className='App'>
        {/* 因为 关联的组件位于FocusInput当中，所以使用 ref 作为转发  */}
        <FocusInput ref={this.input} />
      </div>
    );
  }
}
```

## 2.受控组件与非受控组件

受控组件和非受控组件指的都是表单元素

```html
<input />
<textarea></textarea>
<select></select>
```

### 2.1 受控组件

受控组件，受到 React 组件管理控制，表单的状态，只能通过 setState( ) 来更新，下面是受控组件，使用 setState 进行状态更新

```jsx
import React, { Component } from 'react';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      name: '张三',
    };
  }
  changeValue = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  render() {
    const { name } = this.state;
    return (
      <div className='App'>
        <h1>{name}</h1>
        <input type='text' value={name} onChange={this.changeValue}></input>
        <hr />
        <button
          onClick={() => {
            console.log(`state:${name}`);
          }}
        >
          提交
        </button>
      </div>
    );
  }
}
```

特点：数据可控，完全由 react 中的 state 进行管理

### 2.2 非受控组件

特点：不是通过 React 拿过来的 ，是使用 ref 从 DOM 节点获取表单数据，表单数据交由 DOM 节点来处理

```jsx
import React, { Component, createRef } from 'react';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      name: '张三',
    };
    this.input = createRef();
  }

  changeValue = () => {
    this.setState({
      // 这个不是通过 React 拿过来的 ，是使用 ref 从DOM 节点获取表单数据，表单数据交由 DOM 节点来处理
      name: this.input.current.value,
    });
  };
  render() {
    const { name } = this.state;
    return (
      <div className='App'>
        <h1>{name}</h1>
        <input
          type='text'
          value={name}
          onChange={this.changeValue}
          ref={this.input}
        ></input>
        <hr />
        <button
          onClick={() => {
            console.log(`state:${this.input.current.value}`);
          }}
        >
          提交
        </button>
      </div>
    );
  }
}
```

特点： 通过 ref 获取 DOM 节点进行数据更新，这样就不可控了，不能统一进行管理

```jsx
import React, { Component } from 'react';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
  }
  getData = (e) => {
    // 动态更新对象属性
    console.log([e.target.name]);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  // 阻止表单提交
  stopSubmit = (e) => {
    e.preventDefault();
  };
  submitData = () => {
    const { username, password } = this.state;
    // 输入框里输入的数据
    console.log(username, password);
  };
  render() {
    return (
      <div className='App'>
        <form onSubmit={this.stopSubmit}>
          <div>
            <label htmlFor='username'>用户名：</label>
            <input
              type='text'
              id='username'
              // 受控组件绑定 value 防止用户更改输入
              value={this.state.username}
              name='username'
              onChange={this.getData}
            ></input>
          </div>

          <div>
            <label htmlFor='password'>密码：</label>
            <input
              type='text'
              id='password'
              name='password'
              value={this.state.password}
              onChange={this.getData}
            ></input>
          </div>

          <input type='submit' value='提交' onClick={this.submitData}></input>
        </form>
      </div>
    );
  }
}
```

## 3.高阶组件

高阶函数：一个函数就可以接收另一个函数作为参数

1.  接受一个或者多个函数作为输入
2.  输出一个函数

```jsx
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
```

高阶组件就是一个函数，这个函数接受一个组件作为参数，并返回一个新的组件

高阶组件就是通过 props 把 account 传递给目标组件，目标组件就直接从 props 里面拿数据就可以

高阶组件（HOC，highOrderComponent）是 React 中用于复用组件的逻辑的一种技巧，HOC 不是 react api 的一部分，是一种基于 React 的组合特性而形成的设计模式

高阶组件就是参数是组件，返回值为新组件，高阶组件就是一个函数

当不同的组件需使用相同的功能的时候，不同组件会出现重复的代码，使用高阶组件可以实现功能的复用，不是代码的复用，封装并分离组件中的通用逻辑，让通用的逻辑在组件间更好的复用

```jsx
import React from 'react';

// 高阶组件是一个函数 它的参数是一个组件，并且返回一个组件
/* 
WrapWithAccount是一个组件，返回一个组件

*/
export default function WrapWithAccount(WrapComponent) {
  return class extends React.Component {
    constructor() {
      super();
      this.state = {
        account: 10000,
      };
    }
    render() {
      return <WrapComponent {...this.state} />;
    }
  };
}
```

被 NewUser、vipUser、Svip 组件复用：

```jsx
import React, { Component } from 'react';
import WrapWithAccount from './WrapWithAccount';

class NewUser extends Component {
  render() {
    return (
      <div>
        <h2>新用户积分：{this.props.account}</h2>
      </div>
    );
  }
}

export default WrapWithAccount(NewUser);
```

```jsx
import React, { Component } from 'react';
import WrapWithAccount from './WrapWithAccount';

class Svip extends Component {
  render() {
    return (
      <div>
        <h2>Svip用户积分：{this.props.account}</h2>
      </div>
    );
  }
}
export default WrapWithAccount(Svip);
```

```jsx
import React, { Component } from 'react';
import WrapWithAccount from './WrapWithAccount';

class VipUser extends Component {
  render() {
    return (
      <div>
        <div>
          <h2>vip用户积分：{this.props.account}</h2>
        </div>
      </div>
    );
  }
}
export default WrapWithAccount(VipUser);
```

mixins 的区别：

minxins 存在相互依赖和相互耦合，命名冲突的问题，不利于代码的维护，mixins 特别多的时候，会导致代码的复杂性

React 中推崇组合，不推崇继承

HOC 需要在原来的组件上进行包裹或者嵌套，如果大量使用 HOC，会产生非常多的嵌套，调试很困难 HOC 可以劫持 props
