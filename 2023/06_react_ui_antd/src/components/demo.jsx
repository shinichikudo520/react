import React, { Component } from "react";
import { Button } from "antd";
import "antd/dist/antd.css";

export default class Demo extends Component {
  render() {
    return (
      <div>
        <h3>demo</h3>
        <div>
          <h4>antd 按钮的使用</h4>
          <Button type="primary">primary</Button>
        </div>
      </div>
    );
  }
}
