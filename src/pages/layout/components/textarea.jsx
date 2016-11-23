import React, {Component, PropTypes} from 'react';
import RUI from 'react-component-lib';
import Base, {editable} from '../component-base.jsx';
import { DropTarget } from 'react-dnd';
import generator from './dnd/generator.jsx';

class Textarea extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        editable.styles(this);
        editable.properties(this);
    }

    getDefaultProperties() {
        return [
            {prop:'disable', type:'boolean'},
            {prop:'placeholder', type:'input'},
            {prop:'resize', type:'select', data:['none', 'vertical', 'horizontal', 'both']},
            {prop:'showMaxLength', type:'boolean', default:1},
            {prop:'maxLength', type:'input'}
        ]
    }

    render() {
        var externalProps = this.state.properties ? this.state.properties : {};
        return <RUI.Textarea className={this.state.className} style={this.state.styles} {...externalProps}/>
    }
}

export default Base(Textarea, 'rui');
