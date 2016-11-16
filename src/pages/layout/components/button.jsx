import React, {Component, PropTypes} from 'react';
import RUI from 'react-component-lib';
import Base from '../component-base.jsx';
import { DropTarget } from 'react-dnd';
import generator from './dnd/generator.jsx';

class Button extends Component {
    constructor(props) {
        super(props);

        this.state = {
            className:"",
            styles:{},
            children:"确认"
        };
    }

    getDefaultClassName() {
        return [
            'primary'
        ];
    }

    setClassName(className) {
        this.setState({
            className
        });
    }

    setStyle(styles) {
        this.setState({
            styles
        });
    }

    setChildren(children) {
        this.setState({
            children
        })
    }

    render() {
        return <RUI.Button className={this.state.className} style={this.state.styles} editable={true}>{this.state.children}</RUI.Button>
    }
}

export default Base(Button, 'rui');