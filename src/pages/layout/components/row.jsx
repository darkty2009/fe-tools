import React, {Component, PropTypes} from 'react';
import RUI from 'react-component-lib';
import { DropTarget } from 'react-dnd';
import generator from './dnd/generator.jsx';
import Column from './column.jsx';
import Base, {editable} from '../component-base.jsx';
import unique from '../../../util/unique.jsx';

const boxTarget = generator.createDropTarget('column');

const collect = generator.createDropCollect();

class Row extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasDropped: false,
            hasDroppedOnChild: false,
            list:[<Column index={unique()} />]
        };

        editable.styles(this);
    }

    getSourceCode() {
        var result = this.state.list.map((column, index)=>{
            var column = this.refs["item"+index];
            return column.decoratedComponentInstance.getSourceCode();
        }).join("");
        return `<div className="${"auto-row"}" style={${JSON.stringify(this.state.styles)}}>${result}</div>`;
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
        return connectDropTarget(<div className={"layoutit-row "+(isOverCurrent ? 'dashed' : '') }>
            {this.state.list.map((item, index)=>{
                return React.cloneElement(item, {
                    ref:"item"+index
                })
            })}
        </div>);
    }
}

Row = DropTarget('component-container-row', boxTarget, collect)(Base(Row, "row"));
Row.component = "row";

export default Row;
