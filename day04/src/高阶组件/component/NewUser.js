import React, { Component } from 'react';
import WrapWithAccount from './WrapWithAccount';

class NewUser extends Component {
  render() {
    return (
      <div>
        <h2>新用户积分：{this.props.account}</h2>
      </div>
    );
  }
}

export default WrapWithAccount(NewUser);
