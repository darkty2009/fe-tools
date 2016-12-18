import React, {Component, PropTypes} from 'react';
import RUI from 'react-component-lib';
import Base, {editable} from '../component-base.jsx';
import { DropTarget } from 'react-dnd';
import generator from './dnd/generator.jsx';

class Image extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        editable.styles(this);
        editable.properties(this);
    }

    getTagName() {
        return "img";
    }

    getDefaultClassName() {
        return [];
    }

    getDefaultProperties() {
        return [
            {prop:'src', type:'image', default:'http://static.berbon.com/mall/images/webDiy/no_pic.png'},
            {prop:'href', type:'input', default:'#'}
        ];
    }

    render() {
        var externalProps = this.state.properties ? this.state.properties : {};
        var dom = null;
        if(externalProps.href) {
            dom = <a href={externalProps.href} onClick={(e)=>e.preventDefault()}>
                <img className={this.state.className} style={this.state.styles} {...externalProps} />
            </a>;
        }else {
            dom = <img className={this.state.className} style={this.state.styles} {...externalProps} />;
        }
        return dom;
    }
}

export default Base(Image, 'rui');
