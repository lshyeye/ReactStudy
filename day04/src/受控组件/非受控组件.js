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
        <h1 ref={this.h1}>{name}</h1>
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
