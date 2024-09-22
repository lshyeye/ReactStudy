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
