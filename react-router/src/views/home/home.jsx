import React,{Component} from 'react';
import {Switch,Route,Redirect}  from 'react-router-dom'

import MyNavLink from '../../components/myNavLink/myNavLink';
import News from '../news/news';
import Messages from '../messages/messages'
import './home.css'


export default class Home extends Component{
  render(){
      return (
        <div className="Home">
          <h3>Home component route</h3>
          <div className='nav nav-tabs'>
            <ul>
              <li>
                <MyNavLink to='/home/news'>News</MyNavLink>
              </li>
              <li>
                <MyNavLink to='/home/messages'>Messages</MyNavLink>
              </li>
            </ul>
          </div>
          <div>
            <Switch>
              <Route path='/home/news' component={News} />
              <Route path='/home/messages' component={Messages} />
              <Redirect to='/home/news' />
            </Switch>
          </div>
        </div>
      );
  }
}