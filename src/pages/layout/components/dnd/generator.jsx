export default {
    createDropTarget(type) {
        return {
            drop(props, monitor, component) {
                var result = monitor.getItem();
                if(result) {
                    component.addChild(result.data.define, result.data);
                }
            },
            canDrop(props, monitor) {
                var result = monitor.getItem();
                if(result && result.data.define.component == type) {
                    return true;
                }
                return false;
            }
        };
    },
    createDragSource() {
        return {
            beginDrag(props) {
                return {
                    data:props.data
                };
            },
            endDrag(props, monitor) {
                const item = monitor.getItem();
                const dropResult = monitor.getDropResult();
            }
        };
    },
    createDropCollect() {
        return function collect(connect, monitor) {
            return {
                connectDropTarget: connect.dropTarget(),
                isOver: monitor.isOver(),
                isOverCurrent: monitor.isOver({ shallow: true })
            }
        };
    },
    createDragCollect() {
        return function collect(connect, monitor) {
            return {
                connectDragSource: connect.dragSource(),
                connectDragPreview: connect.dragPreview(),
                isDragging: monitor.isDragging()
            }
        }
    }
};