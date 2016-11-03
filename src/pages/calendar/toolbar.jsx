import React from 'react';
import cn from 'classnames';
import message from 'react-big-calendar/lib/utils/messages.js';
import { navigate } from 'react-big-calendar/lib/utils/constants.js';

let Toolbar = React.createClass({

    contextTypes:{
        calendar:React.PropTypes.object
    },

    onAddEvent() {
        this.context.calendar.onAddEvent();
    },

    render() {
        let { messages, label } = this.props;

        messages = message(messages)

        return (
            <div className='rbc-toolbar'>
        <span className='rbc-btn-group'>
          <button
              type='button'
              onClick={this.navigate.bind(null, navigate.TODAY)}
              >
              {messages.today}
          </button>
          <button
              type='button'
              onClick={this.navigate.bind(null, navigate.PREVIOUS)}
              >
              {messages.previous}
          </button>
          <button
              type='button'
              onClick={this.navigate.bind(null, navigate.NEXT)}
              >
              {messages.next}
          </button>
        </span>

        <span className='rbc-toolbar-label'>
          { label }
        </span>

        <span style={{marginRight:'10px'}}>
            <button type='button' onClick={this.onAddEvent}>新增事件</button>
        </span>

        <span className='rbc-btn-group'>
            {this.viewNamesGroup(messages)}
        </span>
            </div>
        );
    },

    navigate(action){
        this.props.onNavigate(action)
    },

    view(view){
        this.props.onViewChange(view)
    },

    viewNamesGroup(messages) {
        let viewNames = this.props.views
        const view = this.props.view

        if (viewNames.length > 1) {
            return (
                viewNames.map(name =>
                        <button type='button' key={name}
                                className={cn({'rbc-active': view === name})}
                                onClick={this.view.bind(null, name)}
                            >
                            {messages[name]}
                        </button>
                )
            )
        }
    }
});

export default Toolbar;