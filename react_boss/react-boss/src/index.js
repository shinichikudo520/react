import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import {Provider} from 'react-redux'

import Register from './containers/register/register';
import Login from './containers/login/login'
import App from './containers/App/app';
import store from './redux/store';



ReactDOM.render( (
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route path='/register' component={Register}/>
                <Route path='/login' component={Login}/>
                <Route  component={App}/>{/*不配置路径，则代表默认路由*/}
            </Switch>
        </HashRouter>
    </Provider>
) , document.getElementById('root'));