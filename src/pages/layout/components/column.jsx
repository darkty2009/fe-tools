import React, {Component, PropTypes} from 'react';
import RUI from 'react-component-lib';
import { DropTarget } from 'react-dnd';
import generator from './dnd/generator.jsx';
import Base, {editable} from '../component-base.jsx';
import unique from '../../../util/unique.jsx';

const boxTarget = generator.createDropTarget('rui');

const collect = generator.createDropCollect();

class Column extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasDropped: false,
            hasDroppedOnChild: false,
            list:[]
        };
        let _this = this;

        //�������������ʱ����������
        if(props.source && props.source.content && props.source.content.length){
            let list = this.state.list = [];
            props.source.content.forEach(function(d){
                list.push(<d.define index={unique()} source={d} editable={true} onDelete={_this.removeChild.bind(_this)} />);
            });
        }
        editable.className(this, props.source && props.source.className ? props.source.className : 'flex-start');
        editable.styles(this,props.source && props.source.className ? props.source.className:{});
    }

    getSourceCode() {
        var result = this.state.list.map((comp, index)=>{
            var comp = this.refs["item"+index];
            return comp.getSourceCode();
        }).join("");
        return `<div className="${"auto-column "+this.state.className}" style={${JSON.stringify(this.state.styles)}}>${result}</div>`;
    }

    getSourceData() {
        var result = this.state.list.map((comp, index)=>{
            var comp = this.refs["item"+index];
            return comp.getSourceData();
        });
        return result
    }

    getDefaultClassName() {
        return [
            'flex-start',
            'center',
            'flex-end',
            'space-between',
            'space-around',
            'initial',
            'flex-col'
        ];
    }

    addChild(Instance, source) {
        var list = this.state.list;
        list.push(<Instance index={unique()} source={source} editable={true} onDelete={this.removeChild.bind(this)} />);
        this.setState({
            list
        });
    }

    removeChild(target) {
        var list = this.state.list;
        list = list.map(function(item) {
            if(target.props.index == item.props.index) {
                return undefined;
            }
            return item;
        }).filter(function(item) {
            return !!item;
        });

        this.setState({
            list
        });
    }

    render() {
        const { greedy, isOver, isOverCurrent, connectDropTarget, children } = this.props;
        return connectDropTarget(<div className={"layoutit-column "+(isOverCurrent ? 'dashed' : '') + (" " + this.state.className) }>
            {this.state.list.map((item, index)=>{
                return React.cloneElement(item, {
                    ref:"item"+index
                })
            })}
        </div>);
    }
}

Column = DropTarget('component-container-row', boxTarget, collect)(Base(Column, "column"));
Column.component = "column";

export default Column;
