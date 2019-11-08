import React,{Component} from 'react';

import './App.css';
import * as actions from '../../redux/actions';
export default class App extends Component{
  state = {
    count:0
  }
  increment = () => {
    //获取下拉框的值：非受控组件
    const val = this.select.value*1;
    // debugger
    //更新状态
    this.props.store.dispatch(actions.increment(val));
  }
  incrementIfOdd = () => {
    //获取下拉框的值：非受控组件
    const val = this.select.value*1;

    //获取状态的初始值
    const count = this.props.store.getState();
    if(count % 2 === 1){
      //更新状态
      this.props.store.dispatch(actions.increment(val));
    }
  }
  decrement = () => {
    //获取下拉框的值：非受控组件
    const val = this.select.value*1;

   //更新状态
   this.props.store.dispatch(actions.decrement(val));
  }
  incrementAsync = () => {
    //获取下拉框的值：非受控组件
    const val = this.select.value*1;

    setTimeout(() => {
      //更新状态
      this.props.store.dispatch(actions.increment(val));
    }, 1000);
  }
  render(){
      const count = this.props.store.getState();
      return (
        <div className="App">
          <p>click {count} times</p>
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