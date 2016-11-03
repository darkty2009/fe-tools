import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import calenderReducer from './calendar.jsx';

const rootReducer = combineReducers({
    calenderReducer,
    routing: routerReducer
})

export default rootReducer