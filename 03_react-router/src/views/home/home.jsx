import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import News from "../news/news";
import Messages from "../messages/messages";
import "./home.css";
import MyNavLink from "../../components/myNavLink/myNavLink";

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <h3>Home component route</h3>
        <div className="nav nav-tabs">
          <ul>
            <li>
              <MyNavLink to="/home/news">News</MyNavLink>
            </li>
            <li>
              <MyNavLink to="/home/message">Message</MyNavLink>
            </li>
          </ul>
          <div>
            <Switch>
              <Route path="/home/news" component={News}></Route>
              <Route path="/home/message" component={Messages}></Route>
              <Redirect to="/home/news"></Redirect>
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}
