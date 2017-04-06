import {
    LAYOUT_EVENT_LIST,
    LAYOUT_EVENT_LIST_COMPLETE,
    LAYOUT_EVENT_ADD,
    LAYOUT_EVENT_UPDATE
    } from '../const.jsx';
import base64 from '../util/base64.jsx';
export function getLayoutEventComplete(data) {
    data = data.map(function(item,i){
        item.content = JSON.parse(base64.decode(item.content));
        return item;
    })
    return {
        type: LAYOUT_EVENT_LIST_COMPLETE,
        data:data ? data : []
    };
}

export function getLayoutEventList(options) {
    return dispatch=>{
        $.ajax({
            url:'/layout/list',
            dataType:'json',
            success:function(response) {
                if(response.success) {
                    dispatch(getLayoutEventComplete(response.data));
                }
            }
        });
    };
}

export function addLayoutEvent(data) {
    return dispatch=>{
        $.ajax({
            url:'/layout/add',
            method:'post',
            dataType:'json',
            data:data,
            success:function(response) {
                if(response.success) {
                    dispatch(getLayoutEventList());
                }
            }
        });
    };
}

export function editLayoutEvent(data) {
    return dispatch=>{
        $.ajax({
            url:'/layout/edit',
            method:'post',
            dataType:'json',
            data:data,
            success:function(response) {
                if(response.success) {
                    dispatch(getLayoutEventList());
                }
            }
        })
    }
}

export function updateLayoutEvent(data) {
    return {
        type: LAYOUT_EVENT_UPDATE,
        data: data
    };
}