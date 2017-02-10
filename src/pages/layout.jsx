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
            preview: ''
        };
    }

    componentDidMount() {
        $(window).resize(()=>{
            $('.menu-left,.property-right').height($(window).height() - 44);
        }).resize();
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

    render() {
        return <div className="page page-layout">
            {this.state.preview && (
                <div className="topbar">
                    <RUI.Button onClick={()=>this.preview()}>继续编辑</RUI.Button>
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
                    <Accordion title={"模板 "+`${components.module.length}`}>
                        {components.module.map(function(item, index) {
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
        </div>;
    }
}

LayoutTool = DragDropContext(Backend)(LayoutTool);

export default connect(function(state) {
    return state;
}, {

})(LayoutTool);
