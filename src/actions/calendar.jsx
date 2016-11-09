import {
    CAL_EVENT_LIST,
    CAL_EVENT_LIST_COMPLETE,
    CAL_EVENT_ADD,
    CAL_EVENT_UPDATE
} from '../const.jsx';

export function getCalEventComplete(data) {
    return {
        type: CAL_EVENT_LIST_COMPLETE,
        data:data ? data.map((obj)=>{
            return Object.assign(obj, {
                start:new Date(obj.start_time * 1),
                end:new Date(obj.end_time * 1)
            });
        }) : []
    };
}

export function getCalEventList(options) {
    return dispatch=>{
        $.ajax({
            url:'/event/list',
            dataType:'json',
            success:function(response) {
                if(response.success) {
                    dispatch(getCalEventComplete(response.data));
                }
            }
        });
    };
}

export function addCalEvent(data) {
    return dispatch=>{
        $.ajax({
            url:'/event/add',
            method:'post',
            dataType:'json',
            data:data,
            success:function(response) {
                if(response.success) {
                    dispatch(getCalEventList());
                }
            }
        });
    };
}

export function editCalEvent(data) {
    return dispatch=>{
        $.ajax({
            url:'/event/edit',
            method:'post',
            dataType:'json',
            data:data,
            success:function(response) {
                if(response.success) {
                    dispatch(getCalEventList());
                }
            }
        })
    }
}

export function updateCalEvent(data) {
    return {
        type: CAL_EVENT_UPDATE,
        data: data
    };
}