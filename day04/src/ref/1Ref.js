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
