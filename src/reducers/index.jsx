import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import calenderReducer from './calendar.jsx';
import todoReducer from './todo.jsx';
import layoutReducer from './layout.jsx';

const rootReducer = combineReducers({
    calenderReducer,
    layoutReducer,
    todoReducer,
    routing: routerReducer
})

export default rootReducer
