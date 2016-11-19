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

            this.context.editor().setComponent(null);
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

export var editable = {
    all:function(target, option) {
        option = option || {};
        editable.styles(target, option.styles);
        editable.children(target, option.children);
        editable.className(target, option.className);
        editable.properties(target, option.properties);
    },
    styles:function(target, def) {
        target.state.styles = def || {};
        target.setStyle = function(styles) {
            target.setState({
                styles
            });
        }
    },
    children:function(target, def) {
        target.state.children = def || "文本";
        target.setChildren = function(children) {
            target.setState({
                children
            });
        }
    },
    className:function(target, def) {
        target.state.className = def || "";
        target.setClassName = function(className) {
            target.setState({
                className
            });
        }
    },
    properties:function(target, def) {
        target.state.properties = def || {};
        target.setProperties = function(properties) {
            target.setState({
                properties
            });
        }
    }
};