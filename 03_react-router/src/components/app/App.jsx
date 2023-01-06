import React, { Component } from "react";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";

import About from "../../views/about/about";
import Home from "../../views/home/home";
import "./App.css";
export default class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>React router Demo</h1>
        <div className="content">
          <div className="left">
            <NavLink to="/about" activeClassName="selected">
              About
            </NavLink>
            <NavLink to="/home" activeClassName="selected">
              Home
            </NavLink>
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
