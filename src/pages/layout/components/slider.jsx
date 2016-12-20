import React, {Component, PropTypes} from 'react';
import RUI from 'react-component-lib';
import Base, {editable} from '../component-base.jsx';
import { DropTarget } from 'react-dnd';
import generator from './dnd/generator.jsx';

class Slider extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        editable.styles(this, {
            width:'100%'
        });
        editable.properties(this);
    }

    getTagName() {
        return "RUI.Slider";
    }

    getDefaultClassName() {
        return [];
    }

    getDefaultProperties() {
        return [
            {prop:'autoplay', type:'input', default:3000},
            {prop:'speed', type:'input', default:300},
            {prop:'loop', type:'boolean'},
            {prop:'data', type:'json', default:['http://www.berbon.com/images/mainpage-banner-4-c80e6fd172.jpg']}
        ]
    }

    render() {
        var externalProps = this.state.properties ? this.state.properties : {};
        return <RUI.Slider className={this.state.className} style={this.state.styles} {...externalProps}>
            {externalProps.data && externalProps.data.map(function(src) {
                return <RUI.Slider.Item key={src}>
                    <img src={src} />
                </RUI.Slider.Item>;
            })}
        </RUI.Slider>
    }
}
Slider.useFlex = true;
export default Base(Slider, 'rui');
