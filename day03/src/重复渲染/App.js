import React, { PureComponent, memo } from 'react';

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
const Father = memo(function () {
  console.log('父组件被渲染了');
  return (
    <div className='father'>
      <h1>我是父组件</h1>
    </div>
  );
});

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
