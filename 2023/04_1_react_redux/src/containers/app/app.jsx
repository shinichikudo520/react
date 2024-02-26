import React from 'react';
import {connect} from  'react-redux';

import Counter from  '../../components/counter/counter';
import {increment,decrement,incrementAsync} from '../../redux/actions'

export default connect(
    //1. state是一个对象，对应reducers.js中的每个reducer
    state => ({count:state.counter}),
    {increment,decrement,incrementAsync}
  )(Counter);