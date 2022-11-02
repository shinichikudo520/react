import React from 'react';

import ComponentAdd from '../comment-add/comment-add';
import ComponentList from '../comment-list/comment-list';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [
        { userName: 'aaa', content: 'React挺好的!' },
        { userName: 'nnn', content: 'React太难了!' },
      ],
    };
  }
  addComment = (userName, content) => {
    const { comments } = this.state;
    comments.unshift({ userName, content });
    this.setState({ comments });
  };
  removeComment = (index) => {
    const { comments } = this.state;
    comments.splice(index, 1);
    this.setState({ comments });
  };
  render() {
    const { comments } = this.state;
    return (
      <div id="app">
        <div>
          <header className="site-header jumbotron">
            <div className="container">
              <div className="row">
                <div className="col-xs-12">
                  <h1>请发表对React的评论</h1>
                </div>
              </div>
            </div>
          </header>
          <div className="container">
            <ComponentAdd addComment={this.addComment}></ComponentAdd>
            <ComponentList
              comments={comments}
              removeComment={this.removeComment}
            ></ComponentList>
          </div>
        </div>
      </div>
    );
  }
}
