import {
    TODO_EVENT_LIST,
    TODO_EVENT_LIST_COMPLETE,
    TODO_EVENT_ADD,
    TODO_EVENT_UPDATE
} from '../const.jsx';

import db from '../common/database.jsx';

export default function todo(state, action) {
    if(action.type == TODO_EVENT_LIST_COMPLETE) {
        return {
            list:action.data
        };
    }
    if(action.type == TODO_EVENT_ADD) {
        return {
            list:action.data
        }
    }

    return {
        list:[]
    };
}
