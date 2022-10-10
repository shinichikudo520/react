import React,{Component} from 'react';
import PropTypes from 'prop-types';

import './comment-add.css'

export default class CommentAdd extends Component{
    state = {
        userName:'',
        say:''
    }
    static propTypes = {
        addComment : PropTypes.func.isRequired,
    }
    handleNameChange = (event) => {
        let userName = event.target.value;
        this.setState({userName});
    }
    handleSayChange = (event) => {
        let say = event.target.value;
        this.setState({say});
    }
    //类组件内的函数写成箭头函数，解决this的问题
    handleSubmit = () => { 
        //收集数据：受控组件 state + onChange事件
        let comment = this.state;
        //传送数据
        this.props.addComment(comment);
        //清空输入框
        this.setState({
            userName:'',
            say:''
        });
    }
    render(){
        return (
            <div className='comment_add_jsx'>
                <div>用户名</div>
                <div><input type="text" placeholder='用户名' value={this.state.userName} onChange={this.handleNameChange}/></div>
                <div>评论内容</div>
                <div><textarea name="" id="" cols="30" rows="10" placeholder='评论内容' value={this.state.say} onChange={this.handleSayChange}></textarea></div>
                <div><button className='submit' onClick={this.handleSubmit}>提交</button></div>
            </div>
        );
    }
}