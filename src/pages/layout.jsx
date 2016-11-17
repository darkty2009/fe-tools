import React, {Component, PropTypes} from 'react';
import RUI from 'react-component-lib';
import {connect} from 'react-redux';
import {DragDropContext} from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

import '../style/layout.scss';
//import '../library/jquery-ui-1.9.2.custom.js';
import Accordion from './layout/accordion.jsx';
import ComponentItem from './layout/component-item.jsx';
import ComponentEditor from './layout/component-editor.jsx';
import Container from './layout/components/container.jsx';

import components from './layout/components.jsx';

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
            mode: 'pc'
        };
    }

    modeChange(mode) {
        this.setState({
            mode
        });
    }

    getEditor() {
        return this.refs.editor;
    }

    render() {
        return <div className="page page-layout">
            <div className="menu-left">
                <div className="menu-panel">
                    <div className="operations">
                        <div className="button-group">
                            <RUI.Button>清空</RUI.Button>
                            <RUI.Button>打开</RUI.Button>
                            <RUI.Button>保存</RUI.Button>
                        </div>
                    </div>
                    <div className="operations">
                        <div className="button-group">
                            <RUI.Button onClick={this.modeChange.bind(this, 'pc')} className={this.state.mode == 'pc' && 'primary'}>电脑</RUI.Button>
                            <RUI.Button onClick={this.modeChange.bind(this, 'wx')} className={this.state.mode == 'wx' && 'primary'}>微信</RUI.Button>
                            <RUI.Button onClick={this.modeChange.bind(this, 'rn')} className={this.state.mode == 'rn' && 'primary'}>APP</RUI.Button>
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
            </div>
            <div className="content">
                <div className="layoutit">
                    <Container />
                </div>
            </div>
            <div className="property-right">
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