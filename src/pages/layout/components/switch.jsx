import React, {Component, PropTypes} from 'react';
import RUI from 'react-component-lib';
import Base, {editable} from '../component-base.jsx';
import { DropTarget } from 'react-dnd';
import generator from './dnd/generator.jsx';

class Radio extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        let {styles,properties} = props.source;
        editable.styles(this,styles);
        editable.properties(this,properties);
    }

    getTagName() {
        return "RUI.Switch";
    }
    //必须和文件名保持一致
    getTypeName() {
        return "switch";
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
        return <RUI.Switch style={this.state.styles} {...externalProps}></RUI.Switch>
    }
}

export default Base(Radio, 'rui');
