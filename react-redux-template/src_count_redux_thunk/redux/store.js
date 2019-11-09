import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {counter} from './reducers';

const store = createStore(
    counter,
    applyMiddleware(thunk)//应用异步的中间件
);
console.log(store);

export default store;
