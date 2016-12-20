import React, {Component, PropTypes} from 'react';
import RUI from 'react-component-lib';
import Base, {editable} from '../component-base.jsx';
import { DropTarget } from 'react-dnd';
import generator from './dnd/generator.jsx';

class Pagination extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        editable.styles(this);
        editable.properties(this);
    }

    getTagName() {
        return "RUI.Pagination";
    }

    getDefaultClassName() {
        return [];
    }

    getDefaultProperties() {
        return [
            {prop:'pageSize', type:'input', default:10},
            {prop:'totalNum', type:'input', default:100},
            {prop:'currentPage', type:'input', default:1}
        ]
    }

    render() {
        var externalProps = this.state.properties ? this.state.properties : {};
        return <RUI.Pagination className={this.state.className} style={this.state.styles} {...externalProps}/>
    }
}
export default Base(Pagination, 'rui');
