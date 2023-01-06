import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import News from "../news/news";
import Messages from "../messages/messages";
import "./home.css";

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <h3>Home component route</h3>
      </div>
    );
  }
}
