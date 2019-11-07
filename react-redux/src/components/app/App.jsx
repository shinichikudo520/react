import React,{Component} from 'react';
import './App.css';
export default class App extends Component{
  state = {
    count:0
  }
  increment = () => {
    //获取下拉框的值：非受控组件
    const val = this.select.value;

    //获取状态的初始值
    const {count} = this.state;

    //更新状态
    this.setState({
      count:count + val*1
    });
  }
  incrementIfOdd = () => {
    //获取下拉框的值：非受控组件
    const val = this.select.value;

    //获取状态的初始值
    const {count} = this.state;

    if(count % 2 === 1){
      //更新状态
      this.setState({
        count:count + val*1
      });
    }
  }
  decrement = () => {
    //获取下拉框的值：非受控组件
    const val = this.select.value;

    //获取状态的初始值
    const {count} = this.state;

    //更新状态
    this.setState({
      count:count - val*1
    });
  }
  incrementAsync = () => {
    //获取下拉框的值：非受控组件
    const val = this.select.value;

    //获取状态的初始值
    const {count} = this.state;

    setTimeout(() => {
      //更新状态
      this.setState({
        count:count + val*1
      });
    }, 1000);
  }
  render(){
      return (
        <div className="App">
          <p>click {this.state.count} times</p>
          <div>
            <select ref={select => this.select = select}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
            <button onClick={this.increment}>+</button>
            <button onClick={this.decrement}>-</button>
            <button onClick={this.incrementIfOdd}>increment if odd</button>
            <button onClick={this.incrementAsync}>increment if async</button>
          </div>
        </div>
      );
  }
}