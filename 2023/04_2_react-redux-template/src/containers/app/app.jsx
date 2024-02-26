import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import './app.css';
import CommentAdd from '../../component/comment-add/comment-add'
import CommentList from '../../component/comment-list/comment-list'
import {addComment,handleDelete,getComments} from '../../redux/actions';
class App extends Component{
    static propTypes = {
        comments:PropTypes.array.isRequired,
        addComment:PropTypes.func.isRequired,
        handleDelete:PropTypes.func.isRequired,
    }
    componentDidMount(){
        //初始化comments
        this.props.getComments();
    }
    render(){
        const {comments,addComment,handleDelete} = this.props;
        return (
            <div className='app'>
                <h1>请发表对React的评论</h1>
                <div className='comment'>
                    <div className='comment-add'>
                        <CommentAdd addComment={addComment} />
                    </div>
                    <div className='comment-list'>
                        <CommentList comments={comments} handleDelete={handleDelete} />
                    </div>
                </div>
            </div>
        );
    }
}
export default connect(
    //state是一个对象，对应reducers.js中的每个reducer
    state => ({comments:state.comments}),
    {addComment,handleDelete,getComments}
)(App);