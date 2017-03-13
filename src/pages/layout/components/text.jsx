import React, {Component, PropTypes} from 'react';
import RUI from 'react-component-lib';
import Base, {editable} from '../component-base.jsx';
import { DropTarget } from 'react-dnd';
import generator from './dnd/generator.jsx';

class Text extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        let {className,styles,children} = props.source;
        editable.className(this,className);
        editable.styles(this,styles);
        editable.children(this, children||'文本区域');
    }

    getTagName() {
        return "span";
    }
    //必须和文件名保持一致
    getTypeName() {
        return "text";
    }

    getDefaultClassName() {
        return [];
    }

    render() {
        return <span style={this.state.styles}>{this.state.children}</span>
    }
}

export default Base(Text, 'rui');
