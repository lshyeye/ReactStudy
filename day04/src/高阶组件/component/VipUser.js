import React, { Component } from 'react';
import WrapWithAccount from './WrapWithAccount';

class VipUser extends Component {
  render() {
    return (
      <div>
        <div>
          <h2>Vip用户积分：{this.props.account}</h2>
        </div>
      </div>
    );
  }
}
export default WrapWithAccount(VipUser);
