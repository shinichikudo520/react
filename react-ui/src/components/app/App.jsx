import React,{Component} from 'react';
import { Button,Toast } from 'antd-mobile';

import './App.css';

export default class App extends Component{
  handleClick = ()=>{
    Toast.info('This is a toast tips !!!', 1);
  }
  render(){
      return (
        <div className="App">
          <Button type="primary" onClick={this.handleClick}>primary</Button>
        </div>
      );
  }
}