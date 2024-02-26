import React, { Component } from 'react';
import axios from 'axios';
import Pubsub from 'pubsub-js';

export default class Result extends Component {
  state = {
    initView: true,
    loading: false,
    users: null,
    errorMsg: null,
  };
  componentDidMount() {
    // 2. 订阅消息
    Pubsub.subscribe('search', this.search.bind(this));
  }

  componentWillUnmount() {
    // 参考文档：https://blog.csdn.net/u010565037/article/details/88716681
    // 报错：Can't perform a React state update on an unmounted component
    // 我们不能在组件销毁后设置state，防止出现内存泄漏的情况
    // 关于react中切换路由时报以上错误，实际的原因是因为在组件挂载（mounted）之后进行了异步操作，比如ajax请求或者设置了定时器等，而你在callback中进行了setState操作。当你切换路由时，组件已经被卸载（unmounted）了，此时异步操作中callback还在执行，因此setState没有得到值。
    // 最简单的方式（万金油）
    this.setState = () => {
      return;
    };
  }

  search = (topic, searchName) => {
    console.log('subscribe', topic, searchName);
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
  };

  render() {
    const { initView, loading, errorMsg, users } = this.state;
    if (initView) {
      return <h2>请输入关键词进行搜索</h2>;
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
