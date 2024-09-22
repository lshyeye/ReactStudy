import React, { Component } from 'react';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
  }
  getData = (e) => {
    // 动态更新对象属性
    console.log([e.target.name]);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  // 阻止表单提交
  stopSubmit = (e) => {
    e.preventDefault();
  };
  submitData = () => {
    const { username, password } = this.state;
    // 输入框里输入的数据
    console.log(username, password);
  };
  render() {
    return (
      <div className='App'>
        <form onSubmit={this.stopSubmit}>
          <div>
            <label htmlFor='username'>用户名：</label>
            <input
              type='text'
              id='username'
              // 受控组件绑定 value 防止用户更改输入
              value={this.state.username}
              name='username'
              onChange={this.getData}
            ></input>
          </div>

          <div>
            <label htmlFor='password'>密码：</label>
            <input
              type='text'
              id='password'
              name='password'
              value={this.state.password}
              onChange={this.getData}
            ></input>
          </div>

          <input type='submit' value='提交' onClick={this.submitData}></input>
        </form>
      </div>
    );
  }
}
