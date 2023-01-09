import React, { Component } from "react";

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
    const { id } = this.props.match.params;
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
