import React,{Component} from 'react';
import PropTypes from 'prop-types';

import './comment-item.css'


export default class CommentItem extends Component{
    static propTypes = {
        comment : PropTypes.object.isRequired,
        index : PropTypes.number.isRequired
    }
    handleDelete = () => {
        let {index,comment,handleDelete} = this.props;
        console.log(index);
        if(window.confirm(`是否删除${comment.userName}的评论？`)){
            handleDelete(index);
        }
    }
    render(){
        let {comment} = this.props;
        return (
            <div className='commentItem'>
                <div className='userInfo'>
                    {comment.userName}说：
                    <button onClick={this.handleDelete}>删除</button>
                </div>
                <div className='userComment'>
                    {comment.say}
                </div>
            </div>
        );
    }
}