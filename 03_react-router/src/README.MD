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

3. 通过路由传参

   3.1 在**react\03_react-router\src\views\messages\messages.jsx**中

   - 使用`:paramsName`的方式传递参数

   ```
       // 声明
       <Route path={`/home/message/messagedetails/:id`} component={MessageDetail} />
       // 传参
       <a href={`/home/message/messagedetails/${mes.id}`}>
            {mes.title}
        </a>
   ```

   3.2 在**react\03_react-router\src\views\message_detail\message_detail.jsx**中

   - 使用`this.props.match`读取传递的参数

   ```
        // 读取
        const { id } = this.props.match.params;
   ```

4. 函数传参：在**react\03_react-router\src\views\messages\messages.jsx**中

   - 可以使用箭头函数传参

   ```
    <button onClick={() => this.push(mes.id)}>push查看</button>
    <button onClick={() => this.replace(mes.id)}>
   ```

5. `props`中的`history`对象：在**react\03_react-router\src\views\messages\messages.jsx**中

   5.1 `push`：新增一个路由跳转记录

   ```
   push(id) {
        console.log("push...");
        const url = `/home/message/messagedetails/${id}`;
        this.props.history.push(url);
   }
   ```

   5.2 `replace`：新增一个路由跳转记录，替换当前路由记录

   ```
   replace(id) {
        console.log("replace...");
        const url = `/home/message/messagedetails/${id}`;
        this.props.history.replace(url);
   }
   ```

   5.3 `goBack`: 回退到上一个路由历史记录

   ```
   goBack = () => {
        this.props.history.goBack();
    };
   ```

   5.3 `goForward`: 前进到下一个路由历史记录

   ```
   goForward = () => {
        this.props.history.goForward();
    };
   ```

6. 路由的模糊匹配与京准备匹配

   6.1 模糊匹配【默认】

   - 【输入路径】必须包含【匹配路径】，【输入路径】可以多给，但是不能少给
   - 且顺序要一样

   ```
   // 可以匹配成功
   <NavLink to=`/home/a`></NavLink>
   <NavLink to=`/home/a/b`></NavLink>
   // 无法匹配成功
   <NavLink to=`/home`></NavLink>
   <NavLink to=`/a/home`></NavLink>
   <NavLink to=`/a/home/b`></NavLink>


   <Route path="/home/a" component={Home}></Route>
   ```

   6.2 开启精准匹配：`exact`

   - 只有【输入路径】与【匹配路径】完全一致，才能匹配，实现正确跳转

   ```
   // 可以匹配成功
   <NavLink to=`/home/a`></NavLink>
   // 无法匹配成功
   <NavLink to=`/home/a/b`></NavLink>
   <NavLink to=`/home`></NavLink>
   <NavLink to=`/a/home`></NavLink>
   <NavLink to=`/a/home/b`></NavLink>


   <Route exact path="/home/a" component={Home}></Route>
   ```
