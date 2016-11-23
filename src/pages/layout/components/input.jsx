import React, {Component, PropTypes} from 'react';
import RUI from 'react-component-lib';
import Base, {editable} from '../component-base.jsx';
import { DropTarget } from 'react-dnd';
import generator from './dnd/generator.jsx';

class Input extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        editable.className(this, 'medium');
        editable.styles(this);
        editable.properties(this);
    }

    getDefaultClassName() {
        return [
            'small',
            'medium',
            'large'
        ];
    }

    getDefaultProperties() {
        return [
            {prop:'disable', type:'boolean'},
            {prop:'placeholder', type:'input'},
            {prop:'type', type:'input', default:'text'}
        ]
    }

    render() {
        var externalProps = this.state.properties ? this.state.properties : {};
        return <RUI.Input className={this.state.className} style={this.state.styles} {...externalProps}/>
    }
}

export default Base(Input, 'rui');
