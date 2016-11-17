import React, {Component, PropTypes} from 'react';
import RUI from 'react-component-lib';
import { DropTarget } from 'react-dnd';
import generator from './dnd/generator.jsx';
import Column from './column.jsx';
import Base from '../component-base.jsx';
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
            {this.state.list}
        </div>);
    }
}

Row = DropTarget('component-container-row', boxTarget, collect)(Base(Row));
Row.component = "row";

export default Row;