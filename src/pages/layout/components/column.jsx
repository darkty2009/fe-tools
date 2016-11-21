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

        editable.className(this, 'flex-start');
        editable.styles(this);
    }

    getDefaultClassName() {
        return [
            'flex-start',
            'center',
            'flex-end',
            'space-between',
            'space-around'
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
            {this.state.list}
        </div>);
    }
}

Column = DropTarget('component-container-row', boxTarget, collect)(Base(Column));
Column.component = "column";

export default Column;
