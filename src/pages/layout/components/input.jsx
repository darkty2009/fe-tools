import React, {Component, PropTypes} from 'react';
import RUI from 'react-component-lib';
import Base, {editable} from '../component-base.jsx';
import { DropTarget } from 'react-dnd';
import generator from './dnd/generator.jsx';

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        let {className,styles,properties} = props.source;
        editable.className(this, className||'medium');
        editable.styles(this,styles);
        editable.properties(this,properties);
    }

    getTagName() {
        return "RUI.Input";
    }
    //必须和文件名保持一致
    getTypeName() {
        return "input";
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
