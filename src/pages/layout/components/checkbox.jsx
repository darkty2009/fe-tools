import React, {Component, PropTypes} from 'react';
import RUI from 'react-component-lib';
import Base, {editable} from '../component-base.jsx';
import { DropTarget } from 'react-dnd';
import generator from './dnd/generator.jsx';

class Radio extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        let {styles,properties,children} = props.source;
        editable.all(this, {
            styles:styles,
            properties:properties,
            children:children||'多选项'
        });
    }

    getTagName() {
        return "RUI.Checkbox";
    }
    //必须和文件名保持一致
    getTypeName() {
        return "checkbox";
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
