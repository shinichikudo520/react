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
                  <span>路由跳转：params参数</span>
                  <MyNavLink
                    to={`/home/message/messagedetails/${mes.id}/${mes.title}`}
                  >
                    {mes.title}
                  </MyNavLink>
                  &nbsp;
                </p>
                <p>
                  <span>路由跳转：search参数</span>
                  <MyNavLink
                    to={`/home/message/messagedetails/?id=${mes.id}&title=${mes.title}`}
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
              path={`/home/message/messagedetails/:id/:title`}
              component={MessageDetail}
            />
            {/* search 参数匹配：路由路径的声明方式 */}
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
    const url = `/home/message/messagedetails/${id}`;
    this.props.history.push(url);
  }
  replace(id) {
    console.log("replace...");
    const url = `/home/message/messagedetails/${id}`;
    this.props.history.replace(url);
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
