import React, { PureComponent, shouldComponentUpdate } from 'react';

// 修改数值的时候，生成的数值不影响原来的数值
export default class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      goddness: [
        { id: 1, name: '迪丽热巴' },
        { id: 2, name: '古力娜扎' },
        { id: 3, name: '欧阳娜娜' },
      ],
    };
  }
  // 在组件更新之前调用
  shouldComponentUpdate(nextProps, nextState) {
    // 相同引用
    console.log('nexprops,nextState', nextProps, nextState);
    console.log(nextState.goddness === this.state.goddness);
    if (nextState.goddness !== this.state.goddness) return true;
    return false; //不更新
  }

  render() {
    return (
      <div>
        <h1>列表</h1>
        <ul>
          {this.state.goddness.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
        <button onClick={this.add}> 增加1</button>
        <button onClick={this.addGirl}> 增加2</button>
      </div>
    );
  }
  add = () => {
    // 深层数据不同，从而导致误判，从而导致数据的不更新
    const data = { id: 4, name: '玛尔扎哈' };
    this.state.goddness.push(data);
    console.log(this.state.goddness);

    this.setState({ goddness: this.state.goddness });
  };
  addGirl = () => {
    // 拷贝了一份数据
    const list = [...this.state.goddness];
    const data = { id: 4, name: '玛尔扎哈' };
    list.push(data);
    this.setState({ goddness: list });
  };
}
