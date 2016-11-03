import {
    CAL_EVENT_LIST,
    CAL_EVENT_LIST_COMPLETE,
    CAL_EVENT_ADD,
    CAL_EVENT_UPDATE
} from '../const.jsx';

import db from '../common/database.jsx';

export default function calendar(state, action) {
    if(action.type == CAL_EVENT_LIST_COMPLETE) {
        return {
            events:action.data
        };
    }
    if(action.type == CAL_EVENT_ADD) {
        return {
            events:action.data
        }
    }

    return {
        events:[]
    };
}