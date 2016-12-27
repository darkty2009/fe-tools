import React, {Component, PropTypes} from 'react';
import RUI from 'react-component-lib';
import {connect} from 'react-redux';
import { getTodoEventList, addTodoEvent, editTodoEvent } from '../actions/todo.jsx';

import '../style/todo.scss';

class TodoItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {data} = this.props;
        return <div className="page-todo-item">
            <p>{data.name}</p>
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

    render() {
        return <div className="row">
            <div className="page page-todo">
                <div className="row">
                    <RUI.Input ref="newContent" className="full" placeholder="想听点什么" onKeyUp={this.keyUpHandler.bind(this)} />
                </div>
                <div className="row page-todo-list">
                    {this.props.list.map(function(item) {
                        return <TodoItem data={item} />;
                    })}
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
