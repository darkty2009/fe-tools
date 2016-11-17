import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import RUI from 'react-component-lib';
import Row from './row.jsx';
import Column from './column.jsx';
import { DropTarget } from 'react-dnd';
import generator from './dnd/generator.jsx';
import unique from '../../../util/unique.jsx';

const boxTarget = generator.createDropTarget('row');

const collect = generator.createDropCollect();

class Container extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hasDropped: false,
            hasDroppedOnChild: false,
            list:[<Row index={unique()} editable={true} onDelete={this.removeChild.bind(this)}></Row>]
        };
    }

    componentDidMount() {

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

    addChild(Instance, source) {
        var list = this.state.list;
        list.push(<Instance index={unique()} source={source} editable={true} onDelete={this.removeChild.bind(this)} />);
        this.setState({
            list
        });
    }

    render() {
        const { greedy, isOver, isOverCurrent, connectDropTarget, children } = this.props;
        return connectDropTarget(<div className={"layoutit-container "+(isOverCurrent ? 'dashed' : '') }>
            {this.state.list}
        </div>);
    }
}

export default DropTarget('component-container-row', boxTarget, collect)(Container);