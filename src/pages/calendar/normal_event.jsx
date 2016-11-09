import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

class NormalEvent extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.update();
    }

    componentDidUpdate() {
        this.update();
    }

    update() {
        var node = $(ReactDOM.findDOMNode(this.refs.status));
        var parent = node.parents('.rbc-event');
        parent.removeClass('lighten-normal lighten-easy lighten-gogogo lighten-warning');
        parent.addClass('lighten-' + this.props.event.status);
    }

    openEdit() {
        if(this.props.event && this.props.event.openHandler) {
            this.props.event.openHandler(this.props.event);
        }
    }

    render() {
        let {event} = this.props;
        return <div className="event-normal" onDoubleClick={this.openEdit.bind(this)}>
            <div ref="status" className={"event-status " + "circle circle-" + event.status}></div>
            <div className="event-name">{event.name}</div>
            <div className="event-title">{event.title}</div>
        </div>
    }
}

export default function({event}) {
    return <NormalEvent event={event} />;
}