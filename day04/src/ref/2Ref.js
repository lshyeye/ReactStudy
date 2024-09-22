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
