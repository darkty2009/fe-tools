import React, {Component, PropTypes} from 'react';
import RUI from 'react-component-lib';
import Base, {editable} from '../component-base.jsx';
import { DropTarget } from 'react-dnd';
import generator from './dnd/generator.jsx';

class Text extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        editable.className(this);
        editable.styles(this);
        editable.children(this, '文本区域');
    }

    getDefaultClassName() {
        return [];
    }

    render() {
        return <span style={this.state.styles}>{this.state.children}</span>
    }
}

export default Base(Text, 'rui');