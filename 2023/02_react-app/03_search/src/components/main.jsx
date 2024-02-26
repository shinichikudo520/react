import React, { Component } from 'react';

import Search from './search';
import Result from './result';

export default class Main extends Component {
  state = {
    searchName: '',
  };
  setSearchName = (searchName) => {
    this.setState({ searchName });
  };
  render() {
    return (
      <div className="Main">
        <Search setSearchName={this.setSearchName}></Search>
        <Result searchName={this.state.searchName}></Result>
      </div>
    );
  }
}
