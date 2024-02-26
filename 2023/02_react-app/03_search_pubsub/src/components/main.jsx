import React, { Component } from 'react';

import Search from './search';
import Result from './result';

export default class Main extends Component {
  render() {
    return (
      <div className="Main">
        <Search></Search>
        <Result></Result>
      </div>
    );
  }
}
