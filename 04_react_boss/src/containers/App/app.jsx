import React,{Component} from 'react';
import {connect} from 'react-redux';


import {actionCreator} from '../../redux/actions'

class App extends Component{
    render(){
        return (
            <div className='App'>
                app
            </div>
        );
    }
}

export default connect(
    state => ({
        xxx:state.xxx,
        yyy:state.yyy
    }),{
        actionCreator,
    }
)(<App/>);