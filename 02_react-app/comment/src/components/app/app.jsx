import React from 'react';
import ComponentAdd from '../comment-add/comment-add';
import ComponentList from '../comment-list/comment-list';
export default class App extends React.Component {
  state = {
    comments: [
      { userName: 'aaa', content: 'React挺好的!' },
      { userName: 'nnn', content: 'React太难了!' },
    ],
  };
  constructor(props) {
    super(props);
  }
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
            <ComponentAdd></ComponentAdd>
            <ComponentList comments={comments}></ComponentList>
          </div>
        </div>
      </div>
    );
  }
}
