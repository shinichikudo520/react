import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
//1. 引入整合后的reducers
import reducers from './reducers';
//2. 创建store对象传入reducers
const store = createStore(
    reducers,
    applyMiddleware(thunk) //应用异步的中间件
);
console.log(store);

export default store;

//3. 此时 redux向外暴露的state是一个对象(即getState()方法得到的是一个对象)
// {counter:2,comments:[]}