import {ADD_COMMENT,DELETE_COMMENT} from './action-type';

export function comments(state = [],action){
    switch(action.type){
        case ADD_COMMENT:
            return [action.data,...state];
        case DELETE_COMMENT:
            console.log(action.data);
            return state.filter((comment,index) => action.data !== index);
        default:
            return state;
    }
}
