import React, { Component } from "react";
import { Route } from "react-router-dom";

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
                <MyNavLink to={`/home/message/messagedetails/${mes.id}`}>
                  {mes.title}
                </MyNavLink>
                &nbsp;
                <button onClick={() => this.push(mes.id)}>push查看</button>
                <button onClick={() => this.replace(mes.id)}>
                  replace查看
                </button>
              </li>
            );
          })}
        </ul>
        <div>
          <Route
            path={`/home/message/messagedetails/:id`}
            component={MessageDetail}
          />
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
}
