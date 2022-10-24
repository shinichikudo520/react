import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ComponentItem extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    removeComment: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
  };
  remove = () => {
    const { removeComment, index, comment } = this.props;
    if (window.confirm(`确定删除${comment.userName}的评论吗?`)) {
      removeComment(index);
    }
  };
  render() {
    const { comment } = this.props;

    return (
      <div>
        <li className="list-group-item">
          <div className="handle">
            <a href="#" onClick={this.remove}>
              删除
            </a>
          </div>
          <p className="user">
            <span>{comment.userName}</span>
            <span>说:</span>
          </p>
          <p className="centence">{comment.content}</p>
        </li>
      </div>
    );
  }
}
