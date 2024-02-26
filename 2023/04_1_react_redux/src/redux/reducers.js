/**
 * 包含n个reducer函数的模块
 */
import { combineReducers } from 'redux'

import { ADD_COMMENT, DELETE_COMMENT, INIT_COMMENTS, INCREMENT, DECREMENT } from './action-types';


function counter(state = 0, action) {
    switch (action.type) {
        case INCREMENT:
            return state + action.data;
        case DECREMENT:
            return state - action.data;
        default:
            return state;

    }
}

function comments(state = [], action) {
    switch (action.type) {
        case ADD_COMMENT:
            return [action.data, ...state];
        case DELETE_COMMENT:
            console.log(action.data);
            return state.filter((comment, index) => action.data !== index);
        case INIT_COMMENTS:
            return action.data;
        default:
            return state;
    }
}

export default combineReducers({
    counter,
    comments
});