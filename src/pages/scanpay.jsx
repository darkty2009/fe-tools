import React, {Component, PropTypes} from 'react';
import RUI from 'react-component-lib';
import {connect} from 'react-redux';

import '../style/scanpay.scss';

class ScanPayView extends Component {
    constructor(props) {
        super(props);

        this.running = "";
        this.state = {
            history:[],
            progress:""
        };
    }

    componentDidMount() {
        this.updateHistory();
    }

    updateHistory() {
        $.ajax({
            url:'/scanpay/history',
            dataType:'json',
            success:function(response) {
                if (response.success) {
                    this.setState({
                        history:response.data
                    });
                }
            }.bind(this)
        });
    }

    createBatch() {
        if(this.running) {
            RUI.DialogManager.alert('只能同时生成一批二维码，人家小身板好累的');
            return;
        }

        var batchNo = $.trim(this.refs.batchNo.getValue());
        if(!batchNo || !batchNo.match(/^\d{4}$/)) {
            RUI.DialogManager.alert('请输入正确的批次号')
        }else {
            RUI.DialogManager.alert('请勿关闭当前网页，如果关闭了就只能等了');
            $.ajax({
                url:'/scanpay/create/' + batchNo,
                dataType:'json',
                success:function(response) {
                    if(response.success) {
                        this.running = response.data;
                        this.resetProgress();
                    }
                }.bind(this)
            });
        }
    }

    resetProgress() {
        this.stopProgress();
        this.startProgress();
    }

    stopProgress() {
        this.timer && clearInterval(this.timer);
    }

    startProgress() {
        this.timer = setInterval(this.updateProgress.bind(this), 2000);
        this.updateProgress();
    }

    updateProgress() {
        $.ajax({
            url:'/scanpay/progress/' + this.running,
            dataType:'json',
            success:function(response) {
                if(response.success) {
                    var message = response.data;
                    if(message.toUpperCase() == 'COMPLETE') {
                        this.stopProgress();
                        this.createFinish(this.running.substring(0, 4));
                        this.running = "";
                    }
                    else if(message.toUpperCase() == 'NOT START') {
                        this.stopProgress();
                        this.running = "";
                        RUI.DialogManager.alert('好像哪里出错了，找管理员吧');
                    }
                    else {
                        this.setState({
                            progress:message
                        });
                    }
                }
            }.bind(this)
        });
    }

    createFinish(batchNo) {
        RUI.DialogManager.alert({
            title:"完成提示",
            message:<p>
                批次号 {batchNo} 生成完了，请主公 <RUI.Button href={"/scanpay/download/"+batchNo}>下载</RUI.Button>
            </p>
        });

        this.setState({
            progress:""
        });
    }

    render() {
        return <div className="row"><div className="page page-scanpay">
            <div className="scanpay-left">
                <div className="scanpay-left-panel">
                    <h4>历史生成记录</h4>
                    <div className="scanpay-history">
                        {this.state.history.length ? this.state.history.map(function(item) {
                            return <div className="scanpay-history-item" key={item}>
                                <label>{item}</label>
                                <RUI.Button href={"/scanpay/download" + item.split('.')[0]} target="_blank">下载</RUI.Button>
                            </div>
                        }) : <p>暂无记录</p>}
                    </div>
                </div>
            </div>
            <div className="scanpay-right">
                <div className="main-input">
                    <RUI.Input ref="batchNo" className="medium" placeholder="请输入批次号，例如：0003" />
                    <RUI.Button className="primary input-submit" onClick={this.createBatch.bind(this)}>生成</RUI.Button>
                </div>
                <div className="main-progress">
                    {this.state.progress && (
                        <p>{this.state.progress}</p>
                    )}
                </div>
            </div>
        </div></div>;
    }
}

export default connect(function(state) {
    return state;
}, {

})(ScanPayView);