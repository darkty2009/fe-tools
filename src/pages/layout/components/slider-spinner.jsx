import React, {Component, PropTypes} from 'react';
import RUI from 'react-component-lib';
import Base, {editable} from '../component-base.jsx';
import { DropTarget } from 'react-dnd';
import generator from './dnd/generator.jsx';

class Spinner extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        editable.styles(this);
        editable.properties(this);
    }

    getTagName() {
        return "RUI.Spinner";
    }

    getDefaultClassName() {
        return [];
    }

    getDefaultProperties() {
        return [
            {prop:'disable', type:'boolean'},
            {prop:'step', type:'input', default:10},
            {prop:'max', type:'input', default:100},
            {prop:'min', type:'input', default:0},
            {prop:'keyboardEnable', type:'boolean', default:true},
            {prop:'eventType', type:'input', default:'blur'},
            {prop:'type', type:'read', default:'slider'}
        ]
    }

    render() {
        var externalProps = this.state.properties ? this.state.properties : {};
        return <RUI.Spinner className={this.state.className} style={this.state.styles} {...externalProps}/>
    }
}
Spinner.useFlex = true;
export default Base(Spinner, 'rui');
