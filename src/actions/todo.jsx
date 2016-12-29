import {
    TODO_EVENT_LIST,
    TODO_EVENT_LIST_COMPLETE,
    TODO_EVENT_ADD,
    TODO_EVENT_UPDATE
} from '../const.jsx';

import RUI from 'react-component-lib';

export function getTodoEventComplete(data) {
    return {
        type: TODO_EVENT_LIST_COMPLETE,
        data:data ? data : []
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

export function editTodoEvent(data) {
    return dispatch=>{
        $.ajax({
            url:'/todo/edit',
            method:'post',
            dataType:'json',
            data:data,
            success:function(response) {
                if(response.success) {
                    dispatch(getTodoEventList());
                }else {
                    RUI.DialogManager.alert(response.message);
                }
            }
        })
    }
}

export function updateTodoEvent(data) {
    return {
        type: TODO_EVENT_UPDATE,
        data: data
    };
}
