import { ADD_COMMENT, DELETE_COMMENT, INIT_COMMENTS } from './action-type';


//同步添加action
export const addComment = (comment) => ({ type: ADD_COMMENT, data: comment });
//同步减少action
export const handleDelete = (index) => ({ type: DELETE_COMMENT, data: index });
//跟异步搭配的同步的获取comments的action
//这个同步不需要暴露
const initComments = (comments) => ({ type: INIT_COMMENTS, data: comments });

//异步action
export const getComments = () => {
    return dispatch => {
        //模拟ajax请求
        setTimeout(() => {
            const comments = [{
                    userName: 'Tom',
                    say: 'React真不错！'
                },
                {
                    userName: 'Jack',
                    say: 'React太难了！'
                }
            ];
            //分发一个同步的action
            dispatch(initComments(comments));
        }, 1000);
    }
}