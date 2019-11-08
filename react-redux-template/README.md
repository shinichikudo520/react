### Redux的学习
1. 安装：`npm install --save redux`
2. 在/src文件夹下创建一个redux文件夹
* 创建一个reducers.js，内容如下：
```
/**
 * 包含n个reducer函数的模块
 */
import {INCREMENT,DECREMENT} from './action-types';

export function counter(state = 0,action){
    switch(action.type){
        case INCREMENT:
            return state + action.data;
        case DECREMENT:
            return state - action.data;
        default:
            return state;
            
    }
}
```
* 创建一个action-types.js，内容如下

````
/**
 * 包含所有action type的常量字符
 */
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

```
* 创建一个actions.js，内容如下
```
/**
 * 包含所有actions creator
 */
import {INCREMENT,DECREMENT} from './action-types';

//增加
export const increment = (val) => ({type:INCREMENT,data:val});
//减少
export const decrement = (val) => ({type:DECREMENT,data:val});

```
* 创建一个store.js，内容如下
```
import {createStore} from 'redux';

import {counter} from './reducers';

const store = createStore(counter);
console.log(store);

export default store;

```

3. 在index.js中引入以下代码：

```
import store from './redux/store'


function render(){
    //注意，要将store对象传给组件
    ReactDOM.render(<App store={store}/>, document.getElementById('root'));
}
render();

```
* 到此，redux的发布机制完成
4. 组件内操作(发布触发事件)：
```
import React,{Component} from 'react';

import './App.css';
import * as actions from '../../redux/actions';

export default class App extends Component{
  increment = () => {
    //获取下拉框的值：非受控组件
    const val = this.select.value*1;
    //2. 分发事件：触发发布，更新状态
    //dispatch(action)中的action对应reducers定义的counter函数的action参数
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
      //1. 读取状态的值
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
```
5. 组件订阅，一旦状态发生改变，要重新渲染组件
```
//一旦状态更新，重新渲染组件
store.subscribe(render);
```
6. 完整的index.js代码如下：
```
import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './components/app/App';
import store from './redux/store'


function render(){
    ReactDOM.render(<App store={store}/>, document.getElementById('root'));
}
render();

//一旦状态更新，重新渲染组件
store.subscribe(render);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

```

### react-redux
1. 安装：`npm install --save react-redux`，简化在react中redux的语法
2. 在index.js中：
```
import {Provider} from 'react-redux';

ReactDOM.render(<Provider store={store}>
   <App/>
</Provider>, document.getElementById('root'));
```

