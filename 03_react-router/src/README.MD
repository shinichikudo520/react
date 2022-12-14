## REACT-ROUTER 路由器

    为了支持SPA单页应用程序产生的一种技术

### 安装

    npm install --save react-router-dom

### 使用

1.  在**react\03_react-router\src\index.js**入口文件中, 需用要`<BrowserRouter></BrowserRouter>`组件包裹`<App />`,已声明该组件需要使用路由功能

    ```
    import { BrowserRouter } from "react-router-dom";


    ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("root")
    );
    ```

2.  在**react\03_react-router\src\components\app\App.jsx**中

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
    - 使用`<Redirect to="/about"></Redirect>`重定向, 当路由无法匹配正确的组件时, 指定默认的跳转组件

    ```
    import { NavLink, Switch, Route, Redirect } from "react-router-dom";


    <Switch>
        <Route path="/about" component={About}></Route>
        <Route path="/home" component={Home}></Route>
        <Redirect to="/about"></Redirect>
    </Switch>
    ```

3.  通过路由传参

    3.1 `params`传参

    - 声明与传参：使用`:paramsName`的方式传递参数, 在**react\03_react-router\src\views\messages\messages.jsx**中

    ```
        // 声明
        <Route path={`/home/message/messagedetails/:id`} component={MessageDetail} />
        // 传参
        <NavLink to={`/home/message/messagedetails/${mes.id}`}>
             {mes.title}
         </NavLink>


         /** 多个参数 */
         // 声明
        <Route path={`/home/message/messagedetails/:id/:title`} component={MessageDetail} />
        // 传参
        <NavLink to={`/home/message/messagedetails/${mes.id}/${mes.title}`}>
             {mes.title}
         </NavLink>

    ```

    - 读取：使用`this.props.match.params`读取传递的参数, 在**react\03_react-router\src\views\message_detail\message_detail.jsx**中

    ```
         // 读取
         const { id } = this.props.match.params;
    ```

    3.2 `search`传参

    - 声明与传参：使用`?search1=value1&search2=value`传参, 在**react\03_react-router\src\views\messages\messages.jsx**中

    ```
        // 不需要特殊声明
        <Route path={`/home/message/messagedetails`} component={MessageDetail} />
        // 传参
        <MyNavLink
         to={`/home/message/messagedetails?id=${mes.id}`}
         >
         {mes.title}
         </MyNavLink>


         /** 多个参数 */
         // 不需要特殊声明
        <Route path={`/home/message/messagedetails`} component={MessageDetail} />
        // 传参
        <MyNavLink
         to={`/home/message/messagedetails?id=${mes.id}&title=${mes.title}`}
         >
         {mes.title}
         </MyNavLink>

    ```

    - 读取：使用`this.props.location.search`读取传递的参数, 在**react\03_react-router\src\views\message_detail\message_detail.jsx**中

    ```
         import qs from "querystring";
         // 读取
         const search = this.props.location.search;
         // 需要通过 querystring 解析 search字符串参数
         const info = qs.parse(search.slice(1));
         const { id } = this.props.match.params;

    ```

    3.3 `state`传参

    - 声明与传参：使用`to={{path:string,state:{s1:v1,s2:v2}}}`传参, 在**react\03_react-router\src\views\messages\messages.jsx**中

    ```
        // 不需要特殊声明
        <Route path={`/home/message/messagedetails`} component={MessageDetail} />
        // 传参
        <MyNavLink
         to={
             {
                 path: "/home/message/messagedetails",
                 state: { id: mes.id, isState: true },
             }
         }
         >
         {mes.title}
         </MyNavLink>
    ```

    - 读取：使用`this.props.location.state`读取传递的参数, 在**react\03_react-router\src\views\message_detail\message_detail.jsx**中

    ```
         // 读取
         id = this.props.location.state.id;

    ```

    - 不清楚缓存的情况下, 刷新, `state`不会丢失, 整个`location`存了一份在浏览器内存(`history`对象)中

4.  函数传参：在**react\03_react-router\src\views\messages\messages.jsx**中

    - 可以使用箭头函数传参

    ```
     <button onClick={() => this.push(mes.id)}>push查看</button>
     <button onClick={() => this.replace(mes.id)}>
    ```

5.  编程式路由导航：`props`中的`history`对象：在**react\03_react-router\src\views\messages\messages.jsx**中, 只有路由组件才有`history`对象, 一般组件【App.jsx】没有

    5.1 `push`：新增一个路由跳转记录

    ```
    push(id) {
         console.log("push...");
         // params 参数
         // const url = `/home/message/messagedetails/${id}/${true}`;
         // this.props.history.push(url);

         // search 参数
         // const url = `/home/message/messagedetails/?id=${id}&isSearch=${true}`;
         // this.props.history.push(url);

         // state 参数
         const url = `/home/message/messagedetails`;
         this.props.history.push(url, { id, isState: true });
    }
    ```

    5.2 `replace`：新增一个路由跳转记录，替换当前路由记录, 上一个路由 A, 当前路由 B, 点击路由 C(replace), 则 history 中只存在 A, C

    ```
    replace(id) {
         console.log("replace...");
         // params 参数
         // const url = `/home/message/messagedetails/${id}/${true}`;
         // this.props.history.replace(url);

         // search 参数
         // const url = `/home/message/messagedetails/?id=${id}&isSearch=${true}`;
         // this.props.history.replace(url);

         // state 参数
         const url = `/home/message/messagedetails`;
         this.props.history.replace(url, { id, isState: true });
    }
    ```

    5.3 `goBack`: 回退到上一个路由历史记录

    ```
    goBack = () => {
         this.props.history.goBack();
     };
    ```

    5.4 `goForward`: 前进到下一个路由历史记录

    ```
    goForward = () => {
         this.props.history.goForward();
     };
    ```

    5.5 `go`: 前进到某一个路由历史记录

    ```
    go = (n:number) => {
         this.props.history.go(n); // n=1/2/-1/-2
     };
    ```

    5.6 `withRouter`：在一般组件使用`history`对象, 在**react\03_react-router\src\components\app\App.jsx**中

    ```
    import {  withRouter } from "react-router-dom";

     // withRouter 包裹一般组件, 即可在一般组件中使用 history 对象
     export default withRouter(App);

    ```

6.  路由的模糊匹配与精准匹配

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

    6.3 存在嵌套路由时不要随意开启精准匹配，比如【message】组件->【messageDetail】组件, 需要传递一个`id`作为参数, 此时无法精准匹配, 所以非必要不开启

7.  路由跳转的 `push`与`replace` 模式
    7.1 `push`模式【默认】, `history` 执行 `push` 方法

    ```
    <MyNavLink
     to={{
         path: "/home/message/messagedetails",
         state: { id: mes.id, isState: true },
     }}
     >
     {mes.title}
     </MyNavLink>
    ```

    7.1 开启`replace`模式, `history` 执行 `replace` 方法

    ```
    <MyNavLink replace
     to={{
         path: "/home/message/messagedetails",
         state: { id: mes.id, isState: true },
     }}
     >
     {mes.title}
     </MyNavLink>
    ```

8.  BrowserRouter 与 HashRouter 的区别
    8.1 底层原理不一样：

        - BrowserRouter 使用的是 H5 的 history API, 不兼容 IE9 及以下版本
        - HashRouter 使用的是 URL 的哈希值

    8.2 path 的表现形式不一样

        - BrowserRouter 的路径中没有#, 例如: localhost:3000/demo/test
        - HashRouter 的路径中包含#, 例如: localhost:3000/#/demo/test

    8.3 刷新后对路由 state 参数的影响

        - BrowserRouter 没有任何影响, 因为 state(整个 location 对象) 保存在history 对象中
        - HashRouter 刷新后会导致路由 state 参数的丢失

    8.4 HashRouter 可以用于解决一些路径错误相关的问题
