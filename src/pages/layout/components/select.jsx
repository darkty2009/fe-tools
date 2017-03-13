import React, {Component, PropTypes} from 'react';
import RUI from 'react-component-lib';
import Base, {editable} from '../component-base.jsx';
import { DropTarget } from 'react-dnd';
import generator from './dnd/generator.jsx';

class Select extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        let {className,styles,properties} = props.source;
        editable.className(this, className||'rui-theme-1');
        editable.styles(this,styles);
        editable.properties(this,properties);
    }

    getTagName() {
        return "RUI.Select";
    }
    //必须和文件名保持一致
    getTypeName() {
        return "select";
    }

    getDefaultClassName() {
        return [
            'rui-theme-1',
            'rui-theme-2',
            'rui-theme-3'
        ];
    }

    getDefaultProperties() {
        return [
            {prop:'disable', type:'boolean'},
            {prop:'data', type:'json', default:[{key:'请选择', value:0}]}
        ]
    }

    render() {
        var externalProps = this.state.properties ? this.state.properties : {};
        return <RUI.Select className={this.state.className} style={this.state.styles} {...externalProps}/>
    }
}

export default Base(Select, 'rui');
