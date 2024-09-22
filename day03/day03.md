# 组件优化

## 1. 组件重复渲染

组件的 props 或者组件的 state 发生变化的时候，react 会构建新的虚拟 DOM

操作 DOM 是非常耗时的，如果需要提高组件的性能，尽可能地减少组件的重新渲染。

组合嵌套存在的问题：

父组件的 state，或者 props 更新的时候无论子组件的 state 或者 props 是否更新都会触发子组件的更新。

```javascript
import React, { Component } from 'react';

class GrandSon extends Component {
  render() {
    console.log(this.props);
    console.log('孙子组件被渲染了');
    return (
      <div>
        <h6>我是孙子组件</h6>
      </div>
    );
  }
}

class Son extends Component {
  constructor() {
    super();
    this.state = {
      name: '张三',
    };
  }
  render() {
    console.log('子组件被渲染了');
    return (
      <div className='son'>
        <h4>儿子组件</h4>
        <div>{this.state.name}</div>
        <GrandSon {...this.state} />
        <button onClick={this.updateName}>更新子组件props</button>
      </div>
    );
  }
  updateName = () => {
    this.setState({
      name: '李四',
    });
  };
}

// 父组件
function Father() {
  console.log('父组件被渲染了');
  return (
    <div className='father'>
      <h1>我是父组件</h1>
    </div>
  );
}

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      number: 0,
    };
  }
  add = () => {
    this.setState({
      number: this.state.number + 1,
    });
  };
  // 当数字增加的时候所有的 Father Son GrandSon 都会被重新渲染，都会重新 log 出来
  render() {
    return (
      <div className='App'>
        <Father />
        <Son />
        <GrandSon />
        <div>App组件上的number： {this.state.number}</div>
        <button onClick={this.add}>增加</button>
      </div>
    );
  }
}
```

当上面的 number 数值变化的时候对应的子组件都会被渲染，影响组件的性能

**生命周期解决上述问题：**

调用生命周期函数：

```javascript
// nextProps 是新的值
  shouldComponentUpdate(nextProps, nextState) {
    // 传入的两个参数是根据最新的 props 和 state 来判断是否需要更新
    // 比较新旧的props，决定是否重新渲染组件，不相等，会重新渲染
    if (this.props.number !== nextProps.number) return true;
    return false;
  }
```

还有一种常用的方法使用 PureComponent：

```javascript
import React, { Component, PureComponent } from 'react';

class GrandSon extends PureComponent {
  render() {
    console.log('孙子组件被渲染了');
    return (
      <div>
        <h6>我是孙子组件</h6>
      </div>
    );
  }
}

class Son extends PureComponent {
  constructor() {
    super();
    this.state = {
      name: '张三',
    };
  }
  render() {
    console.log('子组件被渲染了');
    return (
      <div className='son'>
        <h4>儿子组件</h4>
        <div>{this.state.name}</div>
        <GrandSon {...this.state} />
        <button onClick={this.updateName}>更新子组件props</button>
      </div>
    );
  }
  updateName = () => {
    this.setState({
      name: '李四',
    });
  };
}

// 父组件
function Father() {
  console.log('父组件被渲染了');
  return (
    <div className='father'>
      <h1>我是父组件</h1>
    </div>
  );
}

export default class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      number: 0,
    };
  }
  add = () => {
    this.setState({
      number: this.state.number + 1,
    });
  };
  // 当数字增加的时候所有的 Father Son GrandSon 都会被重新渲染，都会重新 log 出来
  render() {
    return (
      <div className='App'>
        <Father />
        <Son />
        <GrandSon />
        <div>App组件上的number： {this.state.number}</div>
        <button onClick={this.add}>增加</button>
      </div>
    );
  }
}
```

这个时候的变化会只有父组件发行渲染，但是 如果是函数组件的话 无法继承 PureComponent，只能采用新的方法，使用 memo

```javascript
import React, { PureComponent, memo } from 'react';
// 父组件
const Father = memo(function () {
  console.log('父组件被渲染了');
  return (
    <div className='father'>
      <h1>我是父组件</h1>
    </div>
  );
});
```

&#x20;区别：

PureComponent： 主要是 通过 props 和 state 进行浅比较，实现 shouldComponentUpdate

存在的问题：

1.  函数式组件不可用
2.  由于页面进行浅比较，可能由于深层数据的不一致导致而产生错误判断，从而导致页面的不更新
3.  也正是由于进行的浅比较，所以不适合在多层次的嵌套对象

浅比较相关概念：只比较外层的数据结构，只要外层相同就认为相同

```javascript
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
```

组件优化：

我们要避免组件的重复渲染，可以手动 shouldComponentUpdate 生命周期函数，会在组件的重新渲染之前调用，根据这个函数返回的 bool 值决定是否重新渲染组件，如果是 true 就会重新渲染

手动调很麻烦，通过 PureComponent 进行调用。

## 2. key 的重要性

虚拟 DOM 的表示，key 用来作为唯一标识区分

相同的 key，react 认为是同一个节点，防止发生不必要的更新操作

key 的唯一性：

很多时候不要使用 index 作为 key 值

```javascript
import React, { Component } from 'react';
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      list: ['张三', '李四', '王五'],
    };
  }
  render() {
    const { list } = this.state;
    return (
      <div>
        <ul>
          {list.map((item) => (
            <li>
              {item} <input style={{ width: '30px' }}></input>
            </li>
          ))}
        </ul>
        <button onClick={this.add}>添加</button>
      </div>
    );
  }
  add = () => {
    const list = this.state.list;
    list.unshift('赵六');
    this.setState({ list });
  };
}
```

&#x20;

## 3. setState

###### 3.1 setState 是同步的还是异步的？

react18 之前：自动批量更新

1.在合成事件中是异步的，在生命周期钩子中是一步的

2.在原生事件、定时器中，是同步的

合成事件：就是 React 内部自己实现了一套事件处理机制，不是原生的事件

同步更新：每执行一次更新 state ，就 render 一次

异步更新：全部更新完以后执行一次 render&#x20;

批量更新，React 将多次 state 更新进行合并处理，最终只进行一次渲染

React18 之前手动批量更新：

React.unstable_batchedUpdates

React18 之后 自动批量更新 ，采用了新的更新机制，不再依赖于批量更新的标志

```javascript
import React, { PureComponent, shouldComponentUpdate } from 'react';

// 修改数值的时候，生成的数值不影响原来的数值
export default class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      goddness: [
        { id: 1, name: '迪丽热巴' },
        { id: 2, name: '古力娜扎' },
        { id: 3, name: '欧阳娜娜' },
      ],
    };
  }
  // 在组件更新之前调用
  shouldComponentUpdate(nextProps, nextState) {
    // 相同引用
    console.log('nexprops,nextState', nextProps, nextState);
    console.log(nextState.goddness === this.state.goddness);
    if (nextState.goddness !== this.state.goddness) return true;
    return false; //不更新
  }

  render() {
    return (
      <div>
        <h1>列表</h1>
        <ul>
          {this.state.goddness.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
        <button onClick={this.add}> 增加1</button>
        <button onClick={this.addGirl}> 增加2</button>
      </div>
    );
  }
  add = () => {
    // 深层数据不同，从而导致误判，从而导致数据的不更新
    const data = { id: 4, name: '玛尔扎哈' };
    this.state.goddness.push(data);
    console.log(this.state.goddness);

    this.setState({ goddness: this.state.goddness });
  };
  addGirl = () => {
    // 拷贝了一份数据
    const list = [...this.state.goddness];
    const data = { id: 4, name: '玛尔扎哈' };
    list.push(data);
    this.setState({ goddness: list });
  };
}
```

[（17）React 进阶——⑦ React 生命周期函数（中）：巧用 shouldComponentUpdate 提升组件性能 | React 基础理论实操 - 掘金 (juejin.cn)](https://juejin.cn/post/7291477529777520680?searchId=2024092116573750A9B88ED934F2047966)
