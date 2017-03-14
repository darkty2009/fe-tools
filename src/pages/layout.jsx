import React, {Component, PropTypes} from 'react';
import RUI from 'react-component-lib';
import {connect} from 'react-redux';
import {DragDropContext} from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import vkbeautify from 'vkbeautify';

import '../style/layout.scss';
//import '../library/jquery-ui-1.9.2.custom.js';
import Accordion from './layout/accordion.jsx';
import ComponentItem from './layout/component-item.jsx';
import ComponentEditor from './layout/component-editor.jsx';
import Container from './layout/components/container.jsx';

import components from './layout/components.jsx';

import {formatToShow} from './layout/components/modules/formatModuleData.jsx';
import { getLayoutEventList, addLayoutEvent, editLayoutEvent } from '../actions/layout.jsx';
import base64 from '../util/base64.jsx';

class CodeContent extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var textarea = ReactDOM.findDOMNode(this.refs.codetext);
        textarea.value = vkbeautify.xml(textarea.value);
        var editor = CodeMirror.fromTextArea(textarea, {
            mode: "text/html",
            readOnly: true
        });
    }

    render() {
        return <div className="code-preview">
            <textarea ref="codetext">{this.props.code || ""}</textarea>
        </div>;
    }
}

class LayoutTool extends Component {

    static childContextTypes = {
        editor: PropTypes.object
    }

    getChildContext() {
        return {
            editor: this.getEditor.bind(this)
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            mode: 'pc',
            preview: '',
            moduleTitle:'新建模板',
            moduleItem:{key:'新建模板',value:''}
        };
    }

    componentDidMount() {
        $(window).resize(()=>{
            $('.menu-left,.property-right').height($(window).height() - 44);
        }).resize();

        this.getModules();
    }

    componentWillUnmount() {
        $(window).unbind('resize');
    }

    modeChange(mode) {
        this.setState({
            mode
        });
    }

    getEditor() {
        return this.refs.editor;
    }

    getSourceCode() {
        return this.refs.content.decoratedComponentInstance.getSourceCode();
    }

    preview(val) {
        this.setState({
            preview: val ? 'preview' : ''
        });
    }

    previewCode(val) {
        RUI.DialogManager.confirm({
            title:<h5>源码<label style={{color:'#666'}}>（直接复制）</label></h5>,
            message:<CodeContent code={this.getSourceCode()} />,
            submitText:"下载",
            submit:()=>{

            }
        })
    }
    saveModules(){
        var name = this.state.moduleTitle;
        if(!name){
            RUI.DialogManager.alert('模板名不能为空');
            return false;
        }
        var data = {
            title:name,
            content:base64.encode(JSON.stringify(this.refs.content.decoratedComponentInstance.getSourceData()))
        }
        if(this.state.moduleItem.value){
            data.id = this.state.moduleItem.value;
            this.props.editLayoutEvent(data);
        }else{
            this.props.addLayoutEvent(data);
        }
    }

    getModules(){
        this.props.getLayoutEventList();
    }

    render() {
        let {list} = this.props;
        let moduleData = [{key:'新建模板',value:''}].concat(list.map(function(d,i){
            return {key:d.title,value:d.id}
        }));
        return <div className="page page-layout">
            {this.state.preview && (
                <div className="topbar">
                    <RUI.Button onClick={()=>this.preview()}>继续编辑</RUI.Button>
                    <RUI.Button onClick={()=>{
                        this.setState({
                            moduleItem:{key:'新建模板',value:''},
                            moduleTitle:moduleData[0].key
                        },function(){
                            this.refs.addModule.show();
                        })
                    }}>保存模板</RUI.Button>
                    <RUI.Button onClick={()=>this.previewCode(true)}>查看源码</RUI.Button>
                </div>
            )}
            <div className={"menu-left " + (this.state.preview)}>
                <div className="menu-panel">
                    <div className="operations">
                        <div className="button-group">
                            <RUI.Button>清空</RUI.Button>
                            <RUI.Button>打开</RUI.Button>
                            <RUI.Button onClick={()=>this.preview(true)}>预览</RUI.Button>
                        </div>
                    </div>
                    <div className="operations">
                        <div className="button-group">
                            <RUI.Button onClick={this.modeChange.bind(this, 'pc')} className={this.state.mode == 'pc' && 'primary'}>电脑</RUI.Button>
                            <RUI.Button wx className={this.state.mode == 'wx' && 'primary'}>
                                微信
                            </RUI.Button>
                            <RUI.Button rn className={this.state.mode == 'rn' && 'primary'}>
                                APP
                            </RUI.Button>
                        </div>
                    </div>
                </div>
                <div className="menu-panel">
                    <Accordion title={"布局组件 "+`${components.layout.length}`}>
                        {components.layout.map(function(item, index) {
                            return <ComponentItem data={item} key={item.title} />
                        })}
                    </Accordion>
                </div>
                <div className="menu-panel">
                    <Accordion title={"基础组件 "+`${components.base.length}`}>
                        {components.base.map(function(item, index) {
                            return <ComponentItem data={item} key={item.title} />
                        })}
                    </Accordion>
                </div>
                <div className="menu-panel">
                    <Accordion title={"高级组件 "+`${components.component.length}`}>
                        {components.component.map(function(item, index) {
                            return <ComponentItem data={item} key={item.title} />
                        })}
                    </Accordion>
                </div>
                <div className="menu-panel">
                    <Accordion title={"模板 "+`${list.length}`}>
                        {list.map(function(item, index) {
                            item.content = formatToShow(item.content);
                            item.component = 'row';
                            return <ComponentItem data={item} key={item.title} />
                        })}
                    </Accordion>
                </div>
            </div>
            <div className={"content " + (this.state.preview)}>
                <div className="layoutit">
                    <Container ref="content" />
                </div>
            </div>
            <div className={"property-right " + (this.state.preview)}>
                <ComponentEditor ref="editor" />
            </div>
            <RUI.Dialog ref="addModule" title="保存模板" buttons="submit,cancel"  onSubmit={this.saveModules.bind(this)}>
                <div className="auto-container">
                    <div className="auto-row" style={{}}>
                        <div className="auto-column flex-start" style={{}}>
                            <span  >选择模板：</span>
                            <RUI.Select ref="moduleSelect" key={"module"+this.state.moduleItem.value} className="rui-theme-1 w174 " event={"click"} data={moduleData}
                                value={this.state.moduleItem}
                                callback={(e)=>{
                                    this.setState({
                                        moduleItem : e ,
                                        moduleTitle : e.key
                                    });
                                }}
                                ></RUI.Select>
                        </div>
                    </div>
                    <div className="auto-row" style={{marginTop:"20px"}}>
                        <div className="auto-column flex-start" style={{}}>
                            <span  >模板名称：</span>
                            <RUI.Input className="w174 " value={this.state.moduleTitle} onBlur={(e)=>{
                                this.setState({
                                    moduleTitle:e.target.value
                                })
                            }}/>
                        </div>
                    </div>
                </div>
            </RUI.Dialog>
        </div>;
    }
}

LayoutTool = DragDropContext(Backend)(LayoutTool);

export default connect(function(state) {
    return state.layoutReducer
}, {
    getLayoutEventList,
    addLayoutEvent,
    editLayoutEvent
})(LayoutTool);
