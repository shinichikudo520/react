### react实战项目：react_boss
* 模仿boss直聘，简化版
1. 脚手架初始化项目：`create-react-app react-boss`
2. 除index.js外删除src下的所有多余文件，并在src文件夹下创建以下文件夹
    * api：ajax请求相关模块文件夹
    * assets：共用资源文件夹
    * components：UI组件模块文件夹
    * containers：容器组件模块文件夹，由于路由组件一般户与redux产生交互，所以就放在容器组件模块中
    * redux：redux相关模块文件夹
    * utils：工具模块文件夹
    * index.js：入口js
3. 安装项目中需要的库
    * 安装antd-mobile：`npm install antd-mobile --save`
    * 安装antd-mobile 按需打包的依赖模块：`npm install --save-dev babel-plugin-import react-app-rewired`，`npm install customize-cra`
    * 安装react-router：`npm install --save react-router-dom`
    * 安装redux、react-redux、redux-thunk、redux-devtools-extension
    ```
    npm install --save redux@3.7.2 react-redux redux-thunk
    npm install --save-dev redux-devtools-extension
    ```
4. antd-mobile UI库在入口页面(/public/index.html)做相关设置，添加以下代码
```
<!DOCTYPE html>
<html>
<head>
  <!-- set `maximum-scale` for some compatibility issues -->
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
  <script src="https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js"></script>
  <script>
    //处理点击延时
    if ('addEventListener' in document) {
      document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
      }, false);
    }
    if(!window.Promise) {
      document.writeln('<script src="https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-promise.min.js"'+'>'+'<'+'/'+'script>');
    }
  </script>
</head>
<body></body>
</html>
```
5. 为antd-mobile按需打包做相关配置，在根目录(react_boss)下创建文件config-overrides.js，
    * 添加以下内容：
    ```
        const {
        override,
        fixBabelImports
        } = require("customize-cra");

        module.exports = override(
        fixBabelImports("babel-plugin-import", {
            libraryName: "antd-mobile",
            style: "css"
        })
        );
    ```
    * 修改配置(package.json)：
    将以下内容：
    ```
    "scripts": {
        "start": "react-scripts start",
        "build": "react-scripts build",
        "test": "react-scripts test",
        "eject": "react-scripts eject"
    },
    ```
    修改为：
    ```
    "scripts": {
        "start": "react-app-rewired start",
        "build": "react-app-rewired build",
        "test": "react-app-rewired test"
    },
    ```
6. 在容器组件模块(containers文件夹)中创建App组件(App文件夹)，包含app.jsx和app.css，app.jsx内容如下：
```
import React,{Component} from 'react'

export default class App extends Component{
    render(){
        return (
            <div className='App'></div>
        );
    }
}
```
7. 配置index.js内容，基本配置：
```
import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers/App/app';


ReactDOM.render( < App / > , document.getElementById('root'));
```
8. 创建三个组件：register、login、app，由于路由组件一般与redux产生交互，所以一般放在容器组件（containers）模块
9. 配置路由：在index.js中：
```
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Register from './containers/register/register';
import Login from './containers/login/login'
import App from './containers/App/app';


//访问url格式：http://localhost:3000/#/register，不能是http://localhost:3000/register
ReactDOM.render( (
    <HashRouter>
        <Switch>
            <Route path='/register' component={Register}/>
            <Route path='/login' component={Login}/>
            <Route  component={App}/>{/*不配置路径，则代表默认路由*/}
        </Switch>
    </HashRouter>
) , document.getElementById('root'));
```
10. 在redux文件夹中创建store.js、reducers.js、actions.js、action-types.js四个文件
```
//store.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

//reducers.js
/*
    多个reducer函数，根据老的state和指定的一个action，返回一个新的state
*/
import { combineReducers } from 'redux';

import { ACTION_TYPE } from './action-types'

function xxx(state = 0, action) {
    switch (action.type) {
        case ACTION_TYPE:
            return state + 1;
        default:
            return state;
    }
}

function yyy(state = 0, action) {
    return state;
}

export default combineReducers({
    xxx,
    yyy
});

//actions.js
import { ACTION_TYPE } from './action-types';

export const actionCreator = () => ({ type: ACTION_TYPE, data: val });

//action-types.js
export const ACTION_TYPE = 'action_type';
```
11. 使用redux，在index.js中：
```
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import {Provider} from 'react-redux'

import Register from './containers/register/register';
import Login from './containers/login/login'
import App from './containers/App/app';
import store from './redux/store';



ReactDOM.render( (
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route path='/register' component={Register}/>
                <Route path='/login' component={Login}/>
                <Route  component={App}/>{/*不配置路径，则代表默认路由*/}
            </Switch>
        </HashRouter>
    </Provider>
) , document.getElementById('root'));
```
12. 连接组件与redux，app.jsx举例说明，login.jsx、register.jsx以此类推，app.jsx：
```
import React,{Component} from 'react';
import {connect} from 'react-redux';


import {actionCreator} from '../../redux/actions'

class App extends Component{
    render(){
        return (
            <div className='App'>
                app
            </div>
        );
    }
}

export default connect(
    state => ({
        xxx:state.xxx,
        yyy:state.yyy
    }),{
        actionCreator,
    }
)(<App/>);
```