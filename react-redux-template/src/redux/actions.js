import {ADD_COMMENT,DELETE_COMMENT} from './action-type';


//同步添加action
export const addComment = (comment) => ({type:ADD_COMMENT,data:comment});
//同步减少action
export const handleDelete = (index) => ({type:DELETE_COMMENT,data:index});

//异步action
export const getComments = () => {
    return dispatch => {
        //模拟ajax请求
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
            //分发一个同步的action
            dispatch(addComment);
        }, 1000);
    }
}