export default {
    createDropTarget(type) {
        return {
            drop(props, monitor, component) {
                var result = monitor.getItem();
                if(result) {
                    if(!result.data.content){
                        component.addChild(result.data.define, result.data);
                    }else{
                        result.data.content.forEach(function(d){
                            component.addChild(d.define, d);
                        });
                    }
                }
            },
            canDrop(props, monitor) {
                var result = monitor.getItem();
                if(result) {
                    if(!result.data.content){
                        if(type instanceof Array) {
                            return type.indexOf(result.data.define.component) >= 0;
                        }
                        return result.data.define.component == type;
                    }else{
                        return result.data.component == type;
                    }
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