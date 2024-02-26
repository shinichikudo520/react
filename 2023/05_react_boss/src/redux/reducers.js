/*
    多个reducer函数，根据老的state和指定的一个action，返回一个新的state
*/
import { combineReducers } from 'redux';

import { ACTION_TYPE } from './action-types'

function xxx(state = 0, action) {
    switch (action.type) {
        case ACTION_TYPE:
            return state + 1;
        default:
            return state;
    }
}

function yyy(state = 0, action) {
    return state;
}

export default combineReducers({
    xxx,
    yyy
});