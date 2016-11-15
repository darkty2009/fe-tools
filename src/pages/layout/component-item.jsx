import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import RUI from 'react-component-lib';
import DragButton from './drag-button.jsx';

import '../../style/component-item.scss';

export default class ComponentItem extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return <div className="menu-item">
            <label className="menu-item-title">{this.props.data.title}</label>
            <DragButton data={this.props.data} />
        </div>;
    }
}