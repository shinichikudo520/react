import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import About from "../../views/about/about";
import Home from "../../views/home/home";
import MyNavLink from "../myNavLink/myNavLink";
import "./App.css";
export default class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>React router Demo</h1>
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
