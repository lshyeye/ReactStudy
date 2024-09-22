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
