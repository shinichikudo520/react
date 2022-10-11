import React,{Component} from 'react';
import {Route} from 'react-router-dom';

import MessageDetail from '../message_detail/message_detail';

export default class Messages extends Component{
  state = {
    messageArr : []
  }
  componentDidMount(){
    //模拟异步请求
    setTimeout(() => {
      const messageArr = [
        {id:1,title:'message01'},
        {id:2,title:'message02'},
        {id:3,title:'message03'}
      ];
      //更新状态
    this.setState({messageArr});
    }, 1000);
  }
  render(){
      return (
        <div className="Messages">
          <ul>
            {
              this.state.messageArr.map((mes,index) => {
                return (
                  <li key={index}><a href={`/home/messages/messagedetails/${mes.id}`}>{mes.title}</a></li>
                );
              })
            }
          </ul>
          <div>
            <Route path={`/home/messages/messagedetails/:id`}  component={MessageDetail}/>
          </div>
        </div>
      );
  }
}