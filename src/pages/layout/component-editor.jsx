import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import RUI from 'react-component-lib';

import ImageEditor from './editor/image.jsx';
import JSONEditor from './editor/json.jsx';

import 'jsoneditor/dist/jsoneditor.min.css';

import '../../style/component-editor.scss';

class JSONDialog extends Component {
    constructor(props) {
        super(props);

        this.editContent = this.props.value || {};
    }

    getValue() {
        return this.editContent;
    }

    openDialog() {
        RUI.DialogManager.confirm({
            title:this.props.title || "编辑",
            message:<JSONEditor mode={this.props.mode || "tree"} key={Date.now()} value={this.editContent} onChange={this.editorChange.bind(this)} />,
            submit:this.editorSubmit.bind(this)
        });
    }

    editorChange(data) {
        this.editContent = data;
    }

    editorSubmit() {
        if(this.props.onChange) {
            this.props.onChange(this.getValue());
        }
    }

    render() {
        return <RUI.Button style={{margin:0}} onClick={this.openDialog.bind(this)}>点击编辑</RUI.Button>;
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

    setComponent(comp, cb) {
        this.editorStyleContent = {};
        this.setState({
            comp
        }, cb);
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
            message:<JSONEditor mode="tree" key={Date.now()} value={this.state.comp.state.styles} onChange={this.styleEditorChange.bind(this)} />,
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
            return <RUI.Form.Control name={item.prop} type="checkbox" onChange={this.propertiesChange.bind(this)}>
                <RUI.Checkbox value={item.prop} defaultSelected={item.default ? 1 : 0}>开启</RUI.Checkbox>
            </RUI.Form.Control>
        }
        if(item.type == 'select') {
            return <RUI.Form.Control name={item.prop} className="w174" type="select" onChange={this.propertiesChange.bind(this)} data={item.data.map(it=>{return {key:it,value:it}})}>

            </RUI.Form.Control>
        }
        if(item.type == 'image') {
            return <RUI.Form.Control name={item.prop} type="">
                <ImageEditor defaultValue={item.default || ""} onChange={this.propertiesChange.bind(this)}/>
            </RUI.Form.Control>;
        }
        if(item.type == 'json') {
            return <RUI.Form.Control name={item.prop} type="">
                <JSONDialog title={"编辑" + item.prop} mode="code" onChange={this.propertiesChange.bind(this)} value={item.default} />
            </RUI.Form.Control>;
        }
        if(item.type == 'read') {
            return <RUI.Form.Control name={item.prop} type={"input"} mode="static" value={this.state.comp.state.properties[item.prop]} />;
        }
        return <RUI.Form.Control name={item.prop} type={item.type} onBlur={this.propertiesChange.bind(this)} value={this.state.comp.state.properties[item.prop]} />;
    }

    propertiesChange(e) {
        var values = this.refs.properties.getAllFieldValues();
        if(this.state.comp && this.state.comp.setProperties) {
            var data = {};
            var canEditable = this.state.comp.getDefaultProperties();
            values.forEach(function(item) {
                var type = canEditable.find((it)=>{
                    return it.prop == item.name;
                });
                if(type) {
                    type = type.type;
                }else {
                    return;
                }
                if(~['input', 'image'].indexOf(type)) {
                    data[item.name] = item.value || "";
                }
                if(~['boolean'].indexOf(type)) {
                    data[item.name] = item.value[0].selected || item.value[0].defaultSelected;
                }
                if(~['json'].indexOf(type)) {
                    data[item.name] = item.value;
                }
                if(~['select'].indexOf(type)) {
                    data[item.name] = item.value.value;
                }
                console.log(type, item);
            });

            this.state.comp.setProperties(data);
        }

        if(e && e.preventDefault) {
            e.preventDefault();
        }

        return false;
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
                                <RUI.Form ref="properties" rules={{}} className="horizonal" onSubmit={this.propertiesChange.bind(this)}>
                                    {this.state.comp.getDefaultProperties().map(function(item) {
                                        return <RUI.Form.Row label={item.prop} key={"editor" + item.prop}>
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
