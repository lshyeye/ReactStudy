import React, { Component } from 'react';
import WrapWithAccount from './WrapWithAccount';

class Svip extends Component {
  render() {
    return (
      <div>
        <h2>Svip用户积分：{this.props.account}</h2>
      </div>
    );
  }
}
export default WrapWithAccount(Svip);
