import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export default class Result extends Component {
  static propTypes = {
    searchName: PropTypes.string.isRequired,
  };
  state = {
    initView: true,
    loading: false,
    users: null,
    errorMsg: null,
  };
  /**
   * 组件属性发生更新时
   * @param {*} newProps 新的属性
   */
  componentWillReceiveProps(newProps) {
    const { searchName } = newProps;

    // 更新状态
    this.setState({
      initView: false,
      loading: true,
    });

    // 发送axios请求
    const url = `https://api.github.com/search/users?q=${searchName}`;
    axios
      .get(url)
      .then((req) => {
        console.log('result', req);
        if (req.status === 200) {
          const users = req.data.items.map((i) => ({
            name: i.login,
            url: i.html_url,
            avatarUrl: i.avatar_url,
          }));

          this.setState({
            loading: false,
            users,
          });
        }
      })
      .catch((msg) => {
        throw new Error(msg);
      });
  }
  render() {
    const { initView, loading, errorMsg, users } = this.state;
    const { searchName } = this.props;
    if (initView) {
      return <h2>请输入关键词进行搜索:{searchName}</h2>;
    } else if (loading) {
      return <h2>正在请求中...</h2>;
    } else if (errorMsg) {
      return <h2>{errorMsg}</h2>;
    } else {
      return (
        <div className="row">
          {users.map((user, index) => (
            <div className="card" key={index}>
              <a href={user.url} target="_blank">
                <img src={user.avatarUrl} style={{ width: '100px' }} />
              </a>
              <p className="card-text">{user.name}</p>
            </div>
          ))}
        </div>
      );
    }
  }
}
