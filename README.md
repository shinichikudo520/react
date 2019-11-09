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

```
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

//将store对象的管理权交给react-redux
ReactDOM.render(<Provider store={store}>
   <App/>
</Provider>, document.getElementById('root'));
```
3. 至此，App组件就没有了store对象，做以下修改:
* 将App原本需要靠store对象传递的三个数据都作为App组件的属性接收
* 安装prop-types：`npm install prop-types`
```
import React,{Component} from 'react';
//1. 引入propTypes
import PropTypes from 'prop-types';

import './App.css';

export default class App extends Component{
  //2. 将store对象提供的数据都定义为属性
  static propTypes = {
    count : PropTypes.number.isRequired,
    increment : PropTypes.func.isRequired,
    decrement : PropTypes.func.isRequired
  }
  increment = () => {
    //获取下拉框的值：非受控组件
    const val = this.select.value*1;
    // debugger
    //更新状态
    this.props.increment(val);
  }
  incrementIfOdd = () => {
    //获取下拉框的值：非受控组件
    const val = this.select.value*1;

    //获取状态的初始值
    const count = this.props.store.getState();
    if(count % 2 === 1){
      //更新状态
      this.props.increment(val);
    }
  }
  decrement = () => {
    //获取下拉框的值：非受控组件
    const val = this.select.value*1;

   //更新状态
   this.props.decrement(val);
  }
  incrementAsync = () => {
    //获取下拉框的值：非受控组件
    const val = this.select.value*1;

    setTimeout(() => {
      //更新状态
      this.props.increment(val);
    }, 1000);
  }
  render(){
      const {count} = this.props;
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
4. 连接App组件和redux
```
import React,{Component} from 'react';
import PropTypes from 'prop-types';
//1. 引入connect 连接App和redux
import {connect} from  'react-redux';

import './App.css';
//3. 引入redux中App需要的函数
import {increment,decrement} from '../../redux/actions'
//2. 不再直接暴露App
class App extends Component{
  static propTypes = {
    count : PropTypes.number.isRequired,
    increment : PropTypes.func.isRequired,
    decrement : PropTypes.func.isRequired
  }
  increment = () => {
    //获取下拉框的值：非受控组件
    const val = this.select.value*1;
    // debugger
    //更新状态
    this.props.increment(val);
  }
  incrementIfOdd = () => {
    //获取下拉框的值：非受控组件
    const val = this.select.value*1;

    //获取状态的初始值
    const {count} = this.props;
    if(count % 2 === 1){
      //更新状态
      this.props.increment(val);

    }
  }
  decrement = () => {
    //获取下拉框的值：非受控组件
    const val = this.select.value*1;

   //更新状态
   this.props.decrement(val);

  }
  incrementAsync = () => {
    //获取下拉框的值：非受控组件
    const val = this.select.value*1;

    setTimeout(() => {
      //更新状态
      this.props.increment(val);

    }, 1000);
  }
  render(){
      const {count} = this.props;
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
//4. 暴露一个connect包装后的App，connect(param1,param2)，param1是一个回调函数，用来传递数值属性，param2是一个对象，用来传递函数属性，将redux中的函数increment，decrement传给App，由react-redux分发///（dispatch）给redux做状态更新
//param2 ： {increment:increment,decrement:decrement}其中key对应App中属性的名称，value对应redux中actions的函数名称
export default connect(
  state => ({count:state}),
  {increment,decrement}
)(App);
```
5. react-redux将components又细分为components（UI组件）和containers（容器组件），UI组件即只包含react代码，其中不涉及任何react-redux的API，容器组件，则专门处理react-redux的API
* ui组件放在components文件夹下，容器组件放在containers文件夹下
* ui组件拆分内容如下：counter.jsx文件（/src/components/counter/counter.jsx）
```
import React,{Component} from 'react';
import PropTypes from 'prop-types';

import './counter.css';
export default class Counter extends Component{
  static propTypes = {
    count : PropTypes.number.isRequired,
    increment : PropTypes.func.isRequired,
    decrement : PropTypes.func.isRequired
  }
  increment = () => {
    //获取下拉框的值：非受控组件
    const val = this.select.value*1;
    // debugger
    //更新状态
    this.props.increment(val);
  }
  incrementIfOdd = () => {
    //获取下拉框的值：非受控组件
    const val = this.select.value*1;

    //获取状态的初始值
    const {count} = this.props;
    if(count % 2 === 1){
      //更新状态
      this.props.increment(val);

    }
  }
  decrement = () => {
    //获取下拉框的值：非受控组件
    const val = this.select.value*1;

   //更新状态
   this.props.decrement(val);

  }
  incrementAsync = () => {
    //获取下拉框的值：非受控组件
    const val = this.select.value*1;

    setTimeout(() => {
      //更新状态
      this.props.increment(val);

    }, 1000);
  }
  render(){
      const {count} = this.props;
      return (
        <div className="Counter">
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
* 容器组件拆分内容如下：app.jsx文件（/src/containers/app/app.jsx）
```
import React from 'react';
import {connect} from  'react-redux';

import Counter from  '../../components/counter/counter';
import {increment,decrement} from '../../redux/actions'

export default connect(
    state => ({count:state}),
    {increment,decrement}
  )(Counter);
```
* index.js中引用关系作出修改：
```
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import './index.css';
//1. 主要是app.jsx文件的位置修改
import App from './containers/app/app';
import store from './redux/store'

//将store的使用权都交给Provider
ReactDOM.render(<Provider store={store}>
   <App/>
</Provider>, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

```

### redux-thunk：解决redux不能处理异步请求的问题
1. 安装：`npm install --save redux-thunk`
2. 在redux中使用中间件，在store.js中修改以下内容
```
//1. 引入应用中间件的函数applyMiddleware
import {createStore,applyMiddleware} from 'redux';
//2. 引入异步中间件
import thunk from 'redux-thunk';

import {counter} from './reducers';

const store = createStore(
    counter,
    applyMiddleware(thunk)//3. 声明应用异步的中间件
);
console.log(store);

export default store;

```
3. ui组件counter.jsx中异步操作提取出来，修改如下：
```
import React,{Component} from 'react';
import PropTypes from 'prop-types';

import './counter.css';
export default class Counter extends Component{
  static propTypes = {
    count : PropTypes.number.isRequired,
    increment : PropTypes.func.isRequired,
    decrement : PropTypes.func.isRequired,
    //1. 定义一个异步的函数属性，由react-redux从actions中传过来
    incrementAsync : PropTypes.func.isRequired,
  }
  increment = () => {
    //获取下拉框的值：非受控组件
    const val = this.select.value*1;
    // debugger
    //更新状态
    this.props.increment(val);
  }
  incrementIfOdd = () => {
    //获取下拉框的值：非受控组件
    const val = this.select.value*1;

    //获取状态的初始值
    const {count} = this.props;
    if(count % 2 === 1){
      //更新状态
      this.props.increment(val);

    }
  }
  decrement = () => {
    //获取下拉框的值：非受控组件
    const val = this.select.value*1;

   //更新状态
   this.props.decrement(val);

  }
  incrementAsync = () => {
    //获取下拉框的值：非受控组件
    const val = this.select.value*1;

    // setTimeout(() => {
    //   //更新状态
    //   this.props.increment(val);

    // }, 1000);
    //2. 将异步行为放到redux中处理
    this.props.incrementAsync(val);
  }
  render(){
      const {count} = this.props;
      return (
        <div className="Counter">
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
4. 在容器组件app.jsx中将需要的异步action传到UI组件
```
import React from 'react';
import {connect} from  'react-redux';

import Counter from  '../../components/counter/counter';
//1. 引入异步的action
import {increment,decrement,incrementAsync} from '../../redux/actions'

export default connect(
    state => ({count:state}),
    {increment,decrement,incrementAsync}//2. 将异步的action传到ui组件中
  )(Counter);
```
5. actions.js中定义异步action
```
/**
 * 包含所有actions creator
 */
import {INCREMENT,DECREMENT} from './action-types';

//增加，同步action返回的是一个对象
export const increment = (val) => ({type:INCREMENT,data:val});
//减少，同步action返回的是一个对象
export const decrement = (val) => ({type:DECREMENT,data:val});
//1. 异步action返回的是函数
export const incrementAsync = (val) => {
    return dispatch => {
        //异步代码
        setTimeout(() => {
            //1s后才分发一个同步的action(这里是增加的功能，所以直接调用增加的同步action即可，如果需要的功能没有，还需自定义功能的一个同步action)
            dispatch(increment(val));
        }, 1000);
    }
};
```
6. 多个reducer：
* 在reducers.js中
```
//1. 从redux引入整合reducer的函数
import { combineReducers } from 'redux'

import { ADD_COMMENT, DELETE_COMMENT, INIT_COMMENTS, INCREMENT, DECREMENT } from './action-type';

//2. reducer不要分别暴露
function comments(state = [], action) {
    switch (action.type) {
        case ADD_COMMENT:
            return [action.data, ...state];
        case DELETE_COMMENT:
            console.log(action.data);
            return state.filter((comment, index) => action.data !== index);
        case INIT_COMMENTS:
            return action.data;
        default:
            return state;
    }
}

function counter(state = 0, action) {
    switch (action.type) {
        case INCREMENT:
            return state + action.data;
        case DECREMENT:
            return state - action.data;
        default:
            return state;

    }
}
//3. 整合reducer，然后暴露
export default combineReducers({
    comments,
    counter
});
```
* 在store.js中
```
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
//1. 引入整合后的reducers
import reducers from './reducers';
//2. 创建store对象传入reducers
const store = createStore(
    reducers,
    applyMiddleware(thunk) //应用异步的中间件
);
console.log(store);

export default store;

//3. 此时 redux向外暴露的state是一个对象(即getState()方法得到的是一个对象)
// {counter:2,comments:[]}
```
* 在组件中（app.jsx）中
```
import React from 'react';
import {connect} from  'react-redux';

import Counter from  '../../components/counter/counter';
import {increment,decrement,incrementAsync} from '../../redux/actions'

export default connect(
    //1. state是一个对象，对应reducers.js中的每个reducer
    state => ({count:state.counter}),
    {increment,decrement,incrementAsync}
  )(Counter);
```
