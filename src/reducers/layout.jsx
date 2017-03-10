import {
    LAYOUT_EVENT_LIST,
    LAYOUT_EVENT_LIST_COMPLETE,
    LAYOUT_EVENT_ADD,
    LAYOUT_EVENT_UPDATE
} from '../const.jsx';

import db from '../common/database.jsx';

export default function layout(state, action) {
    if(action.type == LAYOUT_EVENT_LIST_COMPLETE) {
        return {
            list:action.data
        };
    }
    if(action.type == LAYOUT_EVENT_ADD) {
        return {
            list:action.data
        }
    }

    return {
        list:[]
    };
}