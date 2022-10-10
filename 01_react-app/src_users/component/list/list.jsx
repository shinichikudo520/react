import React,{Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
// import logo from '../../logo.svg'

import './list.css'

export default class List extends Component{

    state = {
        initView:true,
        isLoading:false,
        users:[],
        errorMsg:''
    }
    static propTypes = {
        searchName : PropTypes.string.isRequired
    }
    //生命周期：组件将要接收新的属性props：监听props的变化
    //一旦props中的searchName发生变化，即发送ajax请求
    componentWillReceiveProps(newProps){
        let {searchName} = newProps;
        //更新搜索状态
        this.setState({initView:false,isLoading:true});

        //发送请求
        let api = 'https://api.github.com/search/users?q='+searchName;
        axios.get(api).then(res=>{
            let users = res.data.items;
            users = users.map(item => {
                return {
                    url:item.html_url,
                    avatarUrl:item.avatar_url,
                    name:item.login,
                };
            });
            console.log(users);
            //更新状态
            this.setState({
                isLoading:false,
                users
            });
        }).catch(error => {
            //更新状态
            this.setState({isLoading:false,errorMsg:error.message});
        });
    }
    render(){
        let {initView,isLoading,users,errorMsg} = this.state;
        let {searchName} = this.props;
        console.log('需要搜索的人：',searchName);
        if(initView){
            return <h2>请输入关键字进行搜索</h2>;
        }else if(isLoading){
            return <h2>正在搜索中...</h2>;
        }else if(errorMsg){
            return <h2>{errorMsg}</h2>;
        }
        return (
            <div id='List'>
                <ul>
                   {users.map((user,index) => (
                        <li key={index}>
                            <div><a href={user.url}><img src={user.avatarUrl} alt=""/></a></div>
                            <div className='card_text'>{user.name}</div>
                        </li>
                   ))}
                </ul>
            </div>
        );
    }
}