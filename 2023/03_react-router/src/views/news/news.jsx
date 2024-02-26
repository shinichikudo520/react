import React,{Component} from 'react';

import './news.css'

export default class News extends Component{
  state = {
    news:['news01','news02','news03'],
  }
  render(){
      return (
        <div className="News">
          <ul>
            {
              this.state.news.map((newMsg,index) => <li key={index}>{newMsg}</li>)
            }
          </ul>
        </div>
      );
  }
}