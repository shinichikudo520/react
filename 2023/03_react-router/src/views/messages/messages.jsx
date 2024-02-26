import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import "./messages.css";
import MyNavLink from "../../components/myNavLink/myNavLink";
import MessageDetail from "../message_detail/message_detail";

export default class Messages extends Component {
  state = {
    messageArr: [],
  };
  componentDidMount() {
    //模拟异步请求
    setTimeout(() => {
      const messageArr = [
        { id: 1, title: "message01" },
        { id: 2, title: "message02" },
        { id: 3, title: "message03" },
      ];
      //更新状态
      this.setState({ messageArr });
    }, 1000);
  }
  render() {
    return (
      <div className="Messages">
        <ul>
          {this.state.messageArr.map((mes, index) => {
            return (
              <li key={index}>
                <p>
                  {" "}
                  {/* 页面跳转会发生请求 */}
                  <span>页面跳转</span>
                  <a href={`/home/messages/messagedetails/${mes.id}`}>
                    {mes.title}
                  </a>
                </p>
                <p>
                  {/* 路由跳转不会发生请求 */}
                  <span>路由跳转：params 参数</span>
                  <MyNavLink
                    to={`/home/message/messagedetails/${mes.id}/${true}`}
                  >
                    {mes.title}
                  </MyNavLink>
                  &nbsp;
                </p>
                <p>
                  <span>路由跳转：search 参数</span>
                  <MyNavLink
                    to={`/home/message/messagedetails/?id=${
                      mes.id
                    }&isSearch=${true}`}
                  >
                    {mes.title}
                  </MyNavLink>
                  &nbsp;
                </p>
                <p>
                  <span>路由跳转：state 参数</span>
                  <MyNavLink
                    to={{
                      path: "/home/message/messagedetails",
                      state: { id: mes.id, isState: true },
                    }}
                  >
                    {mes.title}
                  </MyNavLink>
                  &nbsp;
                </p>
                <p>
                  <span>路由跳转的 replace 模式</span>
                  <MyNavLink
                    replace={true}
                    to={{
                      path: "/home/message/messagedetails",
                      state: { id: mes.id, isState: true },
                    }}
                  >
                    {mes.title}
                  </MyNavLink>
                  &nbsp;
                </p>
                <button onClick={() => this.push(mes.id)}>push查看</button>
                <button onClick={() => this.replace(mes.id)}>
                  replace查看
                </button>
              </li>
            );
          })}
        </ul>
        <button onClick={this.goBack}>回退</button>
        <button onClick={this.goForward}>前进</button>
        <button onClick={this.baidu}>百度</button>
        <div>
          <Switch>
            {/* params 参数匹配：路由路径的声明方式 */}
            <Route
              path={`/home/message/messagedetails/:id/:isParams`}
              component={MessageDetail}
            />
            {/* search 参数匹配：路由路径的声明方式：无需声明 */}
            <Route
              path={`/home/message/messagedetails`}
              component={MessageDetail}
            />
            {/* state 参数匹配：路由路径的声明方式：无需声明 */}
            <Route
              path={`/home/message/messagedetails`}
              component={MessageDetail}
            />
            {/* 路由跳转的 replace 模式 */}
            <Route
              path={`/home/message/messagedetails`}
              component={MessageDetail}
            />
          </Switch>
        </div>
      </div>
    );
  }
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
  goBack = () => {
    this.props.history.goBack();
  };
  goForward = () => {
    this.props.history.goForward();
  };
  baidu = () => {
    window.location = "https://www.baidu.com";
  };
}
