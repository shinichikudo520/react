import React, { Component } from 'react';
import axios from 'axios';

export default class MostStarRepo extends Component {
  state = {
    name: '',
    url: '',
  };
  componentDidMount() {
    // 发送ajax异步请求
    const url = `https://api.github.com/search/repositories?q=re&sort=stars`;
    axios.get(url).then((req) => {
      console.log('axios...', req);
      if (req.status === 200) {
        const d = req.data.items[0];
        const { name, html_url } = d;
        this.setState({ name, url: html_url });
      }
    });

    // fetch 用法
    fetch(url)
      .then((re) => re.json())
      .then((req) => {
        console.log('fetch...', req);
      });
  }
  render() {
    const { name, url } = this.state;
    if (!name) {
      return <h2>LOADING...</h2>;
    }
    return (
      <h2>
        Most star repo is <a href={url}>{name}</a>
      </h2>
    );
  }
}
