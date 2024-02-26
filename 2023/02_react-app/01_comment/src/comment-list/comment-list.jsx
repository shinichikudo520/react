import React from 'react';
import PropTypes from 'prop-types';

import './commentList.css';
import ComponentItem from '../comment-item/comment-item';

export default class ComponentList extends React.Component {
  // 给组件类指定属性
  static propTypes = {
    comments: PropTypes.array.isRequired,
    removeComment: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const { comments } = this.props;
    const display = comments.length === 0 ? 'block' : 'none';
    return (
      <div className="col-md-8">
        <h3 className="reply">评论回复：</h3>
        <h2 style={{ display: display }}>暂无评论，点击左侧添加评论！！！</h2>
        <ul className="list-group">
          {comments.map((comment, index) => (
            <ComponentItem
              comment={comment}
              key={index}
              index={index}
              removeComment={this.props.removeComment}
            />
          ))}
        </ul>
      </div>
    );
  }
}
