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
