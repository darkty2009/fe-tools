import React, {Component, PropTypes} from 'react';
import RUI from 'react-component-lib';
import Base, {editable} from '../component-base.jsx';
import { DropTarget } from 'react-dnd';
import generator from './dnd/generator.jsx';

class Button extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        let {className,styles,properties,children} = props.source;
        editable.all(this,{
            className:className,
            styles:styles,
            properties:properties,
            children:children||"确认"
        });
    }

    //必须和文件名保持一致
    getTypeName() {
        return "button";
    }
    getTagName() {
        return "RUI.Button";
    }

    getDefaultClassName() {
        return [
            'primary',
            'green'
        ];
    }

    getDefaultProperties() {
        return [
            {prop:'disable', type:'boolean'},
            {prop:'icon', type:'input'}
        ]
    }

    render() {
        var externalProps = this.state.properties ? this.state.properties : {};
        return <RUI.Button ref="main" className={this.state.className} style={this.state.styles} {...externalProps}>{this.state.children}</RUI.Button>
    }
}

export default Base(Button, 'rui');
