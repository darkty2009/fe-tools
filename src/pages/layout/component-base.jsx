import React, {Component, PropTypes} from 'react';
import RUI from 'react-component-lib';

import '../../style/component-base.scss';

export default (ComposedComponent, type)=>{
    class ComponentBase extends Component {

        static contextTypes = {
            editor: PropTypes.object,
        }

        constructor(props) {
            super(props);
        }

        addChild(Instance, source) {
            this.refs.content.addChild(Instance, source);
        }

        editHandler() {
            if(ComposedComponent.component != 'row') {
                this.context.editor().setComponent(this.refs.content);
            }
        }

        deleteHandler() {
            if(this.props && this.props.onDelete) {
                this.props.onDelete(this);
            }
        }

        render() {
            return <div className={"wrapped-container " + (type == 'rui' ? 'noflex' : '')}>
                <div className="actions">
                    <RUI.Link onClick={this.editHandler.bind(this)}>编辑</RUI.Link>
                    <RUI.Link onClick={this.deleteHandler.bind(this)}>删除</RUI.Link>
                </div>
                <ComposedComponent ref="content" {...this.props} />
            </div>
        }
    }
    ComponentBase.component = type;
    return ComponentBase;
}