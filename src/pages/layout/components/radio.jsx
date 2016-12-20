import React, {Component, PropTypes} from 'react';
import RUI from 'react-component-lib';
import Base, {editable} from '../component-base.jsx';
import { DropTarget } from 'react-dnd';
import generator from './dnd/generator.jsx';

class Radio extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        editable.all(this, {
            children:'单选项'
        });
    }

    getTagName() {
        return "RUI.Radio";
    }

    getDefaultClassName() {
        return [];
    }

    getDefaultProperties() {
        return [
            {prop:'disable', type:'boolean'},
            {prop:'selected', type:'boolean'}
        ]
    }

    render() {
        var externalProps = this.state.properties ? this.state.properties : {};
        return <RUI.Radio className={this.state.className} style={this.state.styles} {...externalProps}>{this.state.children}</RUI.Radio>
    }
}

export default Base(Radio, 'rui');
