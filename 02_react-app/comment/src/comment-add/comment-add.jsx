import React from "react";

import PropTypes from "prop-types";
export default class ComponentAdd extends React.Component {
  static propTypes = {
    addComment: PropTypes.func.isRequired,
  };
  state = {
    userName: "",
    content: "",
  };
  constructor(props) {
    super(props);
  }
  // 箭头函数不需要在 constructor 进行绑定 this.add = this.add.bind(this)
  add = () => {
    const { userName, content } = this.state;
    const { addComment } = this.props;
    addComment(userName, content);

    // 清空输入框
    this.setState({
      userName: "",
      content: "",
    });
  };
  changeUserName = (e) => {
    const userName = e.target.value;
    this.setState({ userName });
  };
  changeContent = (e) => {
    const content = e.target.value;
    this.setState({ content });
  };

  render() {
    const { userName, content } = this.state;
    return (
      <div className="col-md-4">
        <form className="form-horizontal">
          <div className="form-group">
            <label>用户名</label>
            <input
              type="text"
              className="form-control"
              placeholder="用户名"
              value={userName}
              onChange={this.changeUserName}
            />
          </div>
          <div className="form-group">
            <label>评论内容</label>
            <textarea
              className="form-control"
              rows="6"
              placeholder="评论内容"
              value={content}
              onChange={this.changeContent}
            ></textarea>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button
                type="button"
                className="btn btn-default pull-right"
                onClick={this.add}
              >
                提交
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
