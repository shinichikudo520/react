import React,{Component} from 'react';
import PropTypes from 'prop-types';

import './search.css'

export default class Search extends Component{ 
    state = {
        searchName:''
    }
    static propTypes = {
        setSearchName : PropTypes.func.isRequired,
    }
    changeSearchName = (event) => {
        let searchName = event.target.value;
        //更新状态
        this.setState({searchName});
    }
    search = () => {
        //接收数据：受控组件，state + onChange
        let {searchName} = this.state;
        //传递数据
        this.props.setSearchName(searchName);
    }
    render(){
        let {searchName} = this.state;
        return (
            <div id='Search'>
                <h2>Search Github Users</h2>
                <div>
                    <input type="text" value={searchName} onChange={this.changeSearchName}/>
                    <button onClick={this.search}>Search</button>
                </div>
            </div>
        );
    }
}