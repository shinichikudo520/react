import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

import About from "../../views/about/about";
import Home from "../../views/home/home";
import MyNavLink from "../myNavLink/myNavLink";
import "./App.css";
class App extends Component {
  goBack = () => {
    this.props.history.goBack();
  };
  goForward = () => {
    this.props.history.goForward();
  };
  baidu = () => {
    window.location = "https://www.baidu.com";
  };
  render() {
    return (
      <div className="App">
        <h1>React router Demo</h1>
        <button onClick={this.goBack}>回退</button>&nbsp;
        <button onClick={this.goForward}>前进</button>&nbsp;
        <button onClick={this.baidu}>百度</button>
        <div className="content">
          <div className="left">
            <MyNavLink to="/about">About</MyNavLink>
            <MyNavLink to="/home">Home</MyNavLink>
          </div>
          <div className="right">
            <Switch>
              <Route path="/about" component={About}></Route>
              <Route path="/home" component={Home}></Route>
              <Redirect to="/about"></Redirect>
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(App);
