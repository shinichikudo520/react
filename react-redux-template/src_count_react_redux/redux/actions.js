/**
 * 包含所有actions creator
 */
import {INCREMENT,DECREMENT} from './action-types';

//增加
export const increment = (val) => ({type:INCREMENT,data:val});
//减少
export const decrement = (val) => ({type:DECREMENT,data:val});