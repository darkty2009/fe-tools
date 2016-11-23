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
            children:'多选项'
        });
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
        return <RUI.Checkbox className={this.state.className} style={this.state.styles} {...externalProps}>{this.state.children}</RUI.Checkbox>
    }
}

export default Base(Radio, 'rui');
