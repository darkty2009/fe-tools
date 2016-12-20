import React, {Component, PropTypes} from 'react';
import RUI from 'react-component-lib';
import {connect} from 'react-redux';

import '../style/build-auto.scss';

class LayoutPreview extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="page-layout-preview">
        <div className="auto-container">
            <div className="auto-row" style={{}}>
                <div className="auto-column flex-start" style={{}}>
                    <span  >下单日期：</span>
                    <RUI.DatePicker  ></RUI.DatePicker>
                    <span  style={{"marginLeft":"10px"}}>订单类型：</span>
                    <RUI.Select className="rui-theme-1" style={{"width":"120px"}} data={[{key:'请选择', value:0}]}></RUI.Select>
                </div>
                <div className="auto-column flex-end initial" style={{}}>
                    <RUI.Button  >批量导出</RUI.Button>
                    <RUI.Button className="primary flex-end" >代下单</RUI.Button>
                </div>
            </div>
            <div className="auto-row" style={{}}>
                <div className="auto-column flex-start" style={{}}>
                    <RUI.Table  style={{"width":"100%"}}></RUI.Table>
                </div>
            </div>
            <div className="auto-row" style={{}}>
                <div className="auto-column flex-end" style={{}}>
                    <RUI.Pagination  ></RUI.Pagination>
                </div>
            </div>
            </div>
        </div>;
    }
}

export default connect(function(state) {
    return state;
}, {

})(LayoutPreview);
