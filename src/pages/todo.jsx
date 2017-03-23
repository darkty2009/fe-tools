import React, {Component, PropTypes} from 'react';
import RUI from 'react-component-lib';
import {connect} from 'react-redux';
import { getTodoEventList, addTodoEvent, editTodoEvent } from '../actions/todo.jsx';

import '../style/todo.scss';

class TodoItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit:false,
            director:!!props.data.director,
            loading:false,
            fileList:[]
        };
    }

    directorChange(director) {
        this.setState({
            director: !!director
        });
    }

    submitHandler() {
        let file = this.refs.localFile.getValue();
        if(file && file.length) {
            var data = new FormData();
            data.append('file', file[0]);
            $.ajax({
                url:"/util/upload/file",
                type:'post',
                dataType:'json',
                data:data,
                cache:false,
                processData:false,
                contentType:false
            }).then((response)=>{
                if(response.success) {
                    this.callAction(response.data);
                }
            });
        }else {
            this.callAction();
        }
    }

    callAction(upload) {
        let {data} = this.props;
        this.props.onSubmit(Object.assign({}, data, {
            director:this.refs.director.getValue()
        }, {
            upload:upload || {},
            path:this.refs.path ? this.refs.path.getValue() : ""
        }));

        this.setState({
            edit:false,
            fileList:[]
        });
    }

    render() {
        let {data} = this.props;
        return <div className="page-todo-item-container">
            <div className={"page-todo-item " + `${data.director && !data.upload ? 'doing' : ''} ${data.director && data.upload ? 'complete' : ''}`}>
                <p>{data.name}</p>
                {data.director && <div className="director">{data.director}</div>}
                <RUI.Button icon="edit" onClick={()=>this.setState({edit:!this.state.edit})}>编辑</RUI.Button>
                {data.upload ? <RUI.Button href={`http://static.berboncd.com/fe-tools/upload/ppt-${data.id}/${data.path || ""}`} target="_blank" icon="link">预览</RUI.Button> : null}
            </div>
            {this.state.edit && (
                <div className="page-todo-line">
                    <div>
                        认领人：
                        <RUI.Input ref="director" placeholder="请输入能有效识别的名字" onChange={(e)=>this.directorChange(e.target.value)} defaultValue={data.director || ""} />
                    </div>
                    {this.state.director && <div>
                        <RUI.Upload ref="localFile"></RUI.Upload>
                        <RUI.Tooltip align="top-center">
                            只能上传.zip文件哦，后台会自动解压放到指定目录
                        </RUI.Tooltip>
                    </div>}
                    {this.state.director && <div style={{marginLeft:'10px'}}>
                        <RUI.Input ref="path" defaultValue={data.path || ""} placeholder="解压后访问路径" />
                    </div>}
                    <RUI.Button icon={this.state.loading ? 'loading' : ''} onClick={()=>this.submitHandler()} className={`primary`} disable={this.state.director ? false : true}>保存</RUI.Button>
                </div>
            )}
        </div>;
    }
}

class TodoView extends Component {
    constructor(props) {
        super(props);
    }

    static contextTypes = {
        store: PropTypes.func,
    }

    static defaultProps = {
        lists:[]
    }

    componentDidMount() {
        this.props.getTodoEventList();
    }

    keyUpHandler(e) {
        if(e.keyCode == 13) {
            var value = this.refs.newContent.getValue();
            if(value) {
                this.addEvent(value);
            }
        }
    }

    addEvent(value) {
        this.props.addTodoEvent({
            name:value
        });
    }

    updateEvent(data) {
        this.props.editTodoEvent(data);
        this.setState({
            edit:false
        });
    }

    render() {
        return <div className="row">
            <div className="page page-todo">
                <div className="row">
                    <RUI.Input ref="newContent" className="full" placeholder="想听点什么" onKeyUp={this.keyUpHandler.bind(this)} />
                </div>
                <div className="row page-todo-list">
                    {this.props.list.map(function(item) {
                        return <TodoItem data={item} onSubmit={(data)=>this.updateEvent(data)}/>;
                    }.bind(this))}
                </div>
            </div>
        </div>;
    }
}

export default connect(function(state) {
    return state.todoReducer;
}, {
    getTodoEventList,
    addTodoEvent,
    editTodoEvent
})(TodoView);
