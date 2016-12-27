import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import calenderReducer from './calendar.jsx';
import todoReducer from './todo.jsx';

const rootReducer = combineReducers({
    calenderReducer,
    todoReducer,
    routing: routerReducer
})

export default rootReducer
