import React, { Component } from 'react';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
  }
  // 最贱第一次渲染完成，此时 DOM 节点已经生成了
  componentDidMount() {
    this.setState({
      count: this.state.count + 1,
    });
    // setState 在生命周期是异步的
    console.log(this.state.count); //0
  }
  change = (e) => {
    // 使用合成事件，采用冒泡的形式达到对应的 DOM

    this.setState(
      {
        count: this.state.count + 1,
      },
      () => {
        // 更新之后立即执行，拿到最新的值
        console.log('回调函数中的count：', this.state.count);
      }
    );
    //并没有等待 this.state.count 的执行完毕，所以也是异步的
    console.log('合成事件中的count：', this.state.count);
  };
  render() {
    return (
      <div>
        <h1>{this.state.count}</h1>
        <button onClick={this.change}>change</button>
      </div>
    );
  }
}
