import React from 'react';
import {createStore,applyMiddleware} from 'redux';
import {comments} from './reducers';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'


const store = createStore(comments,composeWithDevTools(applyMiddleware(thunk)));

export default store;