import React, {Component, PropTypes} from 'react';
import RUI from 'react-component-lib';
import Base, {editable} from '../component-base.jsx';
import { DropTarget } from 'react-dnd';
import generator from './dnd/generator.jsx';

class DatePicker extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        editable.styles(this);
        editable.properties(this);
    }

    getTagName() {
        return "RUI.DatePicker";
    }

    getDefaultClassName() {
        return [];
    }

    getDefaultProperties() {
        return [
            {prop:'disable', type:'boolean'},
            {prop:'useClear', type:'boolean'},
            {prop:'showTime', type:'boolean'},
            {prop:'range', type:'boolean'}
        ]
    }

    render() {
        var externalProps = this.state.properties ? this.state.properties : {};
        return <RUI.DatePicker className={this.state.className} style={this.state.styles} {...externalProps}/>
    }
}

export default Base(DatePicker, 'rui');
