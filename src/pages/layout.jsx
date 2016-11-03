import React, {Component, PropTypes} from 'react';
import RUI from 'react-component-lib';
import {connect} from 'react-redux';

class LayoutTool extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    componentDidMount() {
        RUI.DialogManager.alert('正在开发中');
    }

    render() {
        return <div className="page">
            <RUI.Dialog ref="openDialog" buttons={"submit,cancel"} title="选择">
                <div>
                    <div className="row dialog-open-row" style={{marginBottom:10}}>
                        <label className="left" style={{marginRight:10}}>选择文件</label>
                        <div className="left">
                            <RUI.Upload ref="localFile" />
                        </div>
                    </div>
                    <div className="row dialog-open-row">
                        <label className="left" style={{marginRight:10}}>远程URL</label>
                        <div className="left">
                            <RUI.Input ref="remoteURL" className="medium" />
                        </div>
                    </div>
                </div>
            </RUI.Dialog>
        </div>;
    }
}

export default connect(function(state) {
    return state;
}, {

})(LayoutTool);