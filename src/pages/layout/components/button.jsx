import React, {Component, PropTypes} from 'react';
import RUI from 'react-component-lib';
import Base from '../component-base.jsx';
import { DropTarget } from 'react-dnd';
import generator from './dnd/generator.jsx';

class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <RUI.Button editable={true}>按钮</RUI.Button>
    }
}

export default Base(Button, 'rui');