/**
 * 包含所有actions creator
 */
import {INCREMENT,DECREMENT} from './action-types';

//增加，同步action返回的是一个对象
export const increment = (val) => ({type:INCREMENT,data:val});
//减少，同步action返回的是一个对象
export const decrement = (val) => ({type:DECREMENT,data:val});
//异步action返回的是函数
export const incrementAsync = (val) => {
    return dispatch => {
        //异步代码
        setTimeout(() => {
            //1s后才分发一个同步的action(这里是增加的功能，所以直接调用增加的同步action即可，如果需要的功能没有，还需自定义功能的一个同步action)
            dispatch(increment(val));
        }, 1000);
    }
};