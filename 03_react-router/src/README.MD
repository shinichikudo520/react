## REACT-ROUTER 路由器

    为了支持SPA单页应用程序产生的一种技术

### 安装

    npm install --save react-router-dom

### 使用

1. 在**react\03_react-router\src\index.js**入口文件中, 需用要`<BrowserRouter></BrowserRouter>`组件包裹`<App />`,已声明该组件需要使用路由功能

   ```
   import { BrowserRouter } from "react-router-dom";


   ReactDOM.render(
   <BrowserRouter>
       <App />
   </BrowserRouter>,
   document.getElementById("root")
   );
   ```

2. 在**react\03_react-router\src\components\app\App.jsx**中

   - 使用`<NavLink to="/about"></NavLink>`声明路由导航, `to="/about"`指定路由路径
   - `activeClassName="selected"`声明选中激活时的类名, 可单独指定样式, 可增加交互逻辑

   ```
   import { NavLink, Switch, Route, Redirect } from "react-router-dom";


   <NavLink to="/about" activeClassName="selected">
       About
   </NavLink>
   ```

   - 使用`<Switch></Switch>`声明路由切换

   - 使用`<Route path="/about" component={About}></Route>`声明路由组件, `path="/about"`匹配`NavLink`的路由路径, `component={About}`指定路由匹配的组件
   - 使用`<Redirect to="/about"></Redirect>`重定向根路由跳转的路由路径

   ```
   import { NavLink, Switch, Route, Redirect } from "react-router-dom";


   <Switch>
       <Route path="/about" component={About}></Route>
       <Route path="/home" component={Home}></Route>
       <Redirect to="/about"></Redirect>
   </Switch>
   ```
