import {
    CAL_EVENT_LIST,
    CAL_EVENT_LIST_COMPLETE,
    CAL_EVENT_ADD,
    CAL_EVENT_UPDATE
} from '../const.jsx';

import db from '../common/database.jsx';

export function getCalEventComplete(data) {
    return {
        type: CAL_EVENT_LIST_COMPLETE,
        data:data ? data.map((obj)=>{
            return Object.assign(obj, {
                start:new Date(obj.start),
                end:new Date(obj.end)
            });
        }) : []
    };
}

export function getCalEventList(options) {
    return dispatch=>{
        db.events.toArray().then(function(list) {
            dispatch(getCalEventComplete(list));
        });
    };
}

export function addCalEvent(data) {
    return dispatch=>{
        db.events.add(data).then(()=>{
            db.events.toArray().then(list=>{
                dispatch(getCalEventComplete(list));
            })
        });
    };
}

export function updateCalEvent(data) {
    return {
        type: CAL_EVENT_UPDATE,
        data: data
    };
}