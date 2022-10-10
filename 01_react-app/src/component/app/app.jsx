import React,{Component} from 'react';

import './app.css'
import Search from '../search/search'
import List from '../list/list'

export default class App extends Component{

    render(){
        return (
            <div id='App'>
                <Search />
                <List  />
            </div>
        );
    }
}