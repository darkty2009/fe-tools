import {
    TODO_EVENT_LIST,
    TODO_EVENT_LIST_COMPLETE,
    TODO_EVENT_ADD,
    TODO_EVENT_UPDATE
} from '../const.jsx';

export function getTodoEventComplete(data) {
    return {
        type: TODO_EVENT_LIST_COMPLETE,
        data:data ? data.map((obj)=>{
            return Object.assign(obj, {
                start:new Date(obj.start_time * 1),
                end:new Date(obj.end_time * 1)
            });
        }) : []
    };
}

export function getTodoEventList(options) {
    return dispatch=>{
        $.ajax({
            url:'/todo/list',
            dataType:'json',
            success:function(response) {
                if(response.success) {
                    dispatch(getTodoEventComplete(response.data));
                }
            }
        });
    };
}

export function addTodoEvent(data) {
    return dispatch=>{
        $.ajax({
            url:'/todo/add',
            method:'post',
            dataType:'json',
            data:data,
            success:function(response) {
                if(response.success) {
                    dispatch(getTodoEventList());
                }
            }
        });
    };
}

export function updateTodoEvent(data) {
    return {
        type: TODO_EVENT_UPDATE,
        data: data
    };
}
