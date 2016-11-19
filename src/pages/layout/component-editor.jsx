import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import RUI from 'react-component-lib';

import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.min.css';

import '../../style/jsonview.scss';
import '../../style/component-editor.scss';

class JSONStyler extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.source = new JSONEditor(document.getElementById('json-target'), {
            mode:'tree',
            onChange:this.onSourceChange.bind(this, true)
        });
        this.source.set(this.props.value);
    }

    componentWillRecieveProps(nextProps) {
        this.source.set(nextProps.value);
    }

    onSourceChange() {
        if(this.props.onChange) {
            this.props.onChange(this.source.get());
        }
    }

    render() {
        return <div className="editor-dialog-json">
            <div className="jsonviews">
                <div className="json-flex" id="json-target">

                </div>
            </div>
        </div>
    }
}

export default class ComponentEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comp:null
        };

        this.editorStyleContent = {};
    }

    setComponent(comp) {
        this.editorStyleContent = {};
        this.setState({
            comp
        });
    }

    classNameChange(event) {
        var className = event.data ? event.data.map(function(item) {
            return item.selected ? item.value : undefined;
        }).filter(item=>!!item) : [];

        this.state.comp.setClassName(className.join(' '));
    }

    classNameSelected(item) {
        return ~this.state.comp.state.className.indexOf(item) ? 1 : 0;
    }

    childrenChange(e) {
        this.state.comp.setChildren(e.target.value);
    }

    openStyleEditor(e) {
        this.editorStyleContent = this.state.comp.state.styles;
        RUI.DialogManager.confirm({
            title:"编辑样式",
            message:<JSONStyler key={Date.now()} value={this.state.comp.state.styles} onChange={this.styleEditorChange.bind(this)} />,
            submit:this.styleChange.bind(this)
        });
    }

    styleEditorChange(e) {
        this.editorStyleContent = e;
    }

    styleChange() {
        this.state.comp.setStyle(this.editorStyleContent);
    }

    getFormControlChildren(item) {
        if(item.type == 'boolean') {
            return <RUI.Form.Control name={item.prop} type="checkbox">
                <RUI.Checkbox label="" defaultSelected={0} value={item.prop} onChange={this.propertiesChange.bind(this)} />;
            </RUI.Form.Control>;
        }
        return <RUI.Form.Control type={item.type} onBlur={this.propertiesChange.bind(this)} />;
    }

    propertiesChange() {
        var values = this.refs.properties.getAllFieldValues();
        debugger;
    }

    render() {
        return <div className="editor">
            {this.state.comp && (
                <div>
                    {this.state.comp.setClassName && (
                        <div className="editor-panel">
                            <h4 className="editor-panel-title">可选样式</h4>
                            <div className="editor-panel-content">
                                <RUI.CheckboxGroup className="style-group" onChange={this.classNameChange.bind(this)}>
                                    {this.state.comp.getDefaultClassName().map(function(item) {
                                        return <RUI.Checkbox key={item} value={item} selected={this.classNameSelected(item)}>{item}</RUI.Checkbox>
                                    }.bind(this))}
                                </RUI.CheckboxGroup>
                            </div>
                        </div>
                    )}

                    {this.state.comp.setStyle && (
                        <div className="editor-panel">
                            <h5 className="editor-panel-title">自定义样式</h5>
                            <div className="editor-panel-content">
                                <RUI.Button onClick={this.openStyleEditor.bind(this)}>点击编辑</RUI.Button>
                            </div>
                        </div>
                    )}

                    {this.state.comp.setChildren && (
                        <div className="editor-panel">
                            <h4 className="editor-panel-title">内容编辑</h4>
                            <div className="editor-panel-content">
                                <RUI.Input key={this.state.comp._reactInternalInstance._rootNodeID} onChange={this.childrenChange.bind(this)} defaultValue={this.state.comp.state.children} />
                            </div>
                        </div>
                    )}

                    {this.state.comp.setProperties && (
                        <div className="editor-panel">
                            <h4 className="editor-panel-title">属性配置</h4>
                            <div className="editor-panel-content">
                                <RUI.Form ref="properties" rules={{}} className="horizonal">
                                    {this.state.comp.getDefaultProperties().map(function(item) {
                                        return <RUI.Form.Row label={item.prop}>
                                            {this.getFormControlChildren(item)}
                                        </RUI.Form.Row>;
                                    }.bind(this))}
                                </RUI.Form>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>;
    }
}