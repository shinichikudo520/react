import React,{Component} from 'react';
import PropTypes from 'prop-types'

import './comment-list.css'
import CommentItem from '../comment-item/comment-item'


export default class CommentList extends Component{
    //规定属性类型  必须加关键字static
    static propTypes = {
        comments : PropTypes.array.isRequired,
        handleDelete : PropTypes.func.isRequired
    }
    render(){
        let {comments,handleDelete} = this.props;
        let isDisplay = comments.length === 0 ? 'block' : 'none';
        return (
            <div>
                <h5>评论回复：</h5>
                <h6 style={{display:isDisplay}}>暂无评论，点击左侧添加评论！！！</h6>
                {
                    comments.map((comment,index)=><CommentItem comment={comment} key={index} index={index} handleDelete={handleDelete}/>)
                }
            </div>
        );
    }
}