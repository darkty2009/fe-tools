import React, {Component, PropTypes} from 'react';
import RUI from 'react-component-lib';
import Base, {editable} from '../component-base.jsx';
import { DropTarget } from 'react-dnd';
import generator from './dnd/generator.jsx';

class Table extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        let {styles,properties} = props.source;
        editable.styles(this, styles || {width:'100%'});
        editable.properties(this,properties);
    }

    getTagName() {
        return "RUI.Table";
    }
    //必须和文件名保持一致
    getTypeName() {
        return "table";
    }

    getDefaultClassName() {
        return [];
    }

    getDefaultProperties() {
        return [
            {prop:'dataSource', type:'json', default:[{id:1,name:'小涵涵',group:'FE',date:'2016-11-24'},{id:2,name:'小丁丁',group:'FE',date:'2016-11-23'}]},
            {prop:'height', type:'input'},
            {prop:'odd', type:'boolean'},
            {prop:'whiteSpace', type:'boolean'}
        ]
    }

    render() {
        var externalProps = this.state.properties ? this.state.properties : {};
        return <RUI.Table className={this.state.className} style={this.state.styles} {...externalProps}/>
    }
}
Table.useFlex = true;
export default Base(Table, 'rui');
