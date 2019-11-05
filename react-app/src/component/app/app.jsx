import React,{Component} from 'react';

import './app.css'
import Search from '../search/search'
import List from '../list/list'

export default class App extends Component{
    state = {
        searchName:''
    }
    setSearchName = (searchName) => {
        //更新状态
        this.setState({searchName});
    }
    render(){
        let {searchName} = this.state;
        return (
            <div id='App'>
                <Search setSearchName={this.setSearchName}/>
                <List searchName={searchName} />
            </div>
        );
    }
}