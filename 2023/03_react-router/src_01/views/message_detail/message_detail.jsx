import React,{Component} from 'react';


export default class MessageDetail extends Component{
  state = {
    messageDetails : [
        {id:1,title:'message01',content:'蓝忘机'},
        {id:2,title:'message02',content:'魏无羡'},
        {id:3,title:'message03',content:'温宁'}
    ]
  }

  render(){
      //获取路由携带的参数
      const {id} = this.props.match.params;
      const messageDetails = this.state.messageDetails.find((m) => m.id === id*1);
      return (
        <div className="MessageDetail">
          <ul>
            <li>id：{messageDetails.id}</li>
            <li>title：{messageDetails.title}</li>
            <li>content：{messageDetails.content}</li>
          </ul>
        </div>
      );
  }
}