import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './components/app/App';
import store from './redux/store'


function render(){
    ReactDOM.render(<App store={store}/>, document.getElementById('root'));
}
render();

//一旦状态更新，重新渲染组件
store.subscribe(render);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
