import React, { Component } from 'react';
import NewUser from './component/NewUser';
import Svip from './component/Svip';
import VipUser from './component/VipUser';

export default class App extends Component {
  render() {
    return (
      <div>
        <NewUser />
        <VipUser />
        <Svip />
      </div>
    );
  }
}
