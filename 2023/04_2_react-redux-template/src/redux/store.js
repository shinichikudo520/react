import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'


const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;

//此时 redux向外暴露的state是一个对象(即getState()方法得到的是一个对象)
// {counter:2,comments:[]}