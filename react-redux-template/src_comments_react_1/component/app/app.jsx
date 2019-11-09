import React,{Component} from 'react';
import './app.css';
import CommentAdd from '../comment-add/comment-add'
import CommentList from '../comment-list/comment-list'
export default class App extends Component{
    //初始化类组件的state属性
    state = {
        comments : [
            // {
            //     userName:'Tom',
            //     say:'React真不错！'
            // },
            // {
            //     userName:'Jack',
            //     say:'React太难了！'
            // }
        ],
    };
    componentDidMount(){
        //模拟异步请求  初始化数据
        setTimeout(() => {
            const comments = [
                {
                    userName:'Tom',
                    say:'React真不错！'
                },
                {
                    userName:'Jack',
                    say:'React太难了！'
                }
            ];
            this.setState({comments});
        }, 1000);
    }
    addComment = (comment) =>{
        let {comments} = this.state;
        comments.unshift(comment);
        this.setState(comments);
    }
    handleDelete = (index) => {
        let {comments} = this.state;
        comments.splice(index,1);
        this.setState(comments);
    }
    render(){
        return (
            <div className='app'>
                <h1>请发表对React的评论</h1>
                <div className='comment'>
                    <div className='comment-add'>
                        <CommentAdd addComment={this.addComment} />
                    </div>
                    <div className='comment-list'>
                        <CommentList comments={this.state.comments} handleDelete={this.handleDelete} />
                    </div>
                </div>
            </div>
        );
    }
}