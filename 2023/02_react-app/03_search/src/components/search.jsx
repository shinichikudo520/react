import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Search extends Component {
  state = {
    value: '',
  };
  static propTypes = {
    setSearchName: PropTypes.func.isRequired,
  };
  change = (e) => {
    const value = e.target.value.trim();
    this.setState({ value });
  };
  click = () => {
    const searchName = this.state.value.trim();
    const { setSearchName } = this.props;
    setSearchName(searchName);

    this.setState({ value: '' });
  };
  render() {
    return (
      <section className="jumbotron">
        <h3 className="jumbotron-heading">Search Github Users</h3>
        <div>
          <input
            type="text"
            placeholder="enter the name you search"
            value={this.state.value}
            onChange={this.change}
          />
          <button onClick={this.click}>Search</button>
        </div>
      </section>
    );
  }
}
