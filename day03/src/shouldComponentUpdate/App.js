import React, { Component } from 'react';

class TodoItem extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    console.log('child render');
    /*
    我们在这里让控制台打印一些信息，
    以帮助我们直观地观察到 render 函数被自动执行；
      */

    const { content } = this.props;

    return <div onClick={this.handleClick}>{content}</div>;
  }

  handleClick() {
    const { itemDelete, index } = this.props;

    itemDelete(index);
  }
}

export default TodoItem;
