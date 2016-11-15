import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import RUI from 'react-component-lib';

import { DragSource } from 'react-dnd';
import generator from './components/dnd/generator.jsx';

const dragSource = generator.createDragSource();

const collect = generator.createDragCollect();

class DragButton extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const img = new Image();
        img.onload = ()=>this.props.connectDragPreview(img);
        require.ensure([], function() {
            img.src = require('../../style/images/component-row.jpg');
            //img.src = require('../../style/images/component-' + this.props.data.define.component + '.jpg');
        }.bind(this));
    }

    render() {
        let {isDragging, connectDragSource, connectDragPreview} = this.props;
        return connectDragSource(
            <div>
                <RUI.Button className="draggable">拖吧</RUI.Button>
            </div>
        );
    }
}

export default DragSource('component-container-row', dragSource, collect)(DragButton);