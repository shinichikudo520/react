import React, { Component } from "react";
import qs from "querystring";

export default class MessageDetail extends Component {
  state = {
    messageDetails: [
      { id: 1, title: "message01", content: "蓝忘机" },
      { id: 2, title: "message02", content: "魏无羡" },
      { id: 3, title: "message03", content: "温宁" },
    ],
  };

  render() {
    //获取路由携带的参数
    console.log(this.props);
    // 获取params参数
    let id = 1;

    if (this.props.match.params.isParams) {
      // 接收 params 参数
      id = this.props.match.params.id;
    } else if (this.props.location.search) {
      // 接收 search 参数
      const search = this.props.location.search;
      const info = qs.parse(search.slice(1));
      console.log("info", info);
      if (info.isSearch) {
        id = info.id;
      }
    } else if (this.props.location.state && this.props.location.state.isState) {
      // 接收 state 参数
      id = this.props.location.state.id;
    }
    // 获取search参数
    const message = this.state.messageDetails.find((m) => m.id == id);
    return (
      <div className="MessageDetail">
        <ul>
          <li>id:{message.id}</li>
          <li>title:{message.title}</li>
          <li>content:{message.content}</li>
        </ul>
      </div>
    );
  }
}
