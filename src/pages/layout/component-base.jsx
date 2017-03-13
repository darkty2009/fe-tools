import React, {Component, PropTypes} from 'react';
import RUI from 'react-component-lib';
import empty from '../../util/empty.jsx';

import '../../style/component-base.scss';

export default (ComposedComponent, type)=>{
    class ComponentBase extends Component {

        static contextTypes = {
            editor: PropTypes.object
        }

        constructor(props) {
            super(props);
        }

        getSourceData() {
            var item = {};
            var content = this.refs.content;
            item.styles = content.state.styles;
            item.children = content.state.children;
            item.className = content.state.className;
            item.properties = content.state.properties;
            if(type == 'row' || type == 'column') {
                item.type = type;
                item.content =  this.refs.content.getSourceData();
            }else{
                item.type = content.getTypeName();
            }
            return item;
        }
        getSourceCode() {
            if(type == 'row' || type == 'column') {
                return this.refs.content.getSourceCode();
            }

            var content = this.refs.content;
            var className = content.state.className;
            var styles = content.state.styles;
            var children = content.state.children;
            var Tag = content.getTagName();

            if(Tag == 'img') {
                return `<${Tag} ${className ? `className="${className}"` : ""} ${empty(styles) ? "" : `style={${JSON.stringify(styles)}}`} />`;
            }
            return `<${Tag} ${className ? `className="${className}"` : ""} ${empty(styles) ? "" : `style={${JSON.stringify(styles)}}`}>${children ? children : ""}</${Tag}>`;
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
            return <div className={"wrapped-container " + (type == 'rui' && !ComposedComponent.useFlex ? 'noflex' : '')}>
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
        var defaultProps = target.getDefaultProperties();
        var defaultResult = {};
        defaultProps.forEach(function(item) {
            if(typeof item.default != 'undefined') {
                defaultResult[item.prop] = item.default;
            }
        });

        target.state.properties = Object.assign(def || {}, defaultResult);
        target.setProperties = function(properties) {
            target.setState({
                properties
            });
        };
        target.setProperties(target.state.properties);
    }
};
