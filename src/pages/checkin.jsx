import React, {Component, PropTypes} from 'react';
import RUI from 'react-component-lib';
import {connect} from 'react-redux';

import '../style/checkin.scss';

class CheckinView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list:[],
            hash:""
        };
    }

    componentDidMount() {

    }

    doSubmit(fileinfo) {
        if(fileinfo && fileinfo.hash) {
            $.ajax({
                url:'/checkin/parse/' + fileinfo.hash,
                dataType:'json',
                success:function(response) {
                    if(response.success) {
                        this.setState({
                            list:response.data.list,
                            hash:response.data.hash
                        })
                    }
                }.bind(this)
            })
        }
    }

    submitHandler() {
        var _this = this;
        var file = this.refs.file.getValue();
        file = Array.prototype.concat.apply([], file);

        if(file && file.length) {
            file = file[0];

            var data = new FormData();
            data.append('file', file);
            $.ajax({
                url:"/util/upload/file",
                type:'post',
                dataType:'json',
                data:data,
                cache:false,
                processData:false,
                contentType:false
            }).then((response)=>{
                if(response.success) {
                    this.doSubmit(response.data);
                }
            });
        }
    }

    downloadHandler() {
        window.open('/checkin/export/' + this.state.hash, '_blank');
    }

    render() {
        return <div className="row"><div className="page page-checkin">
            <div className="row row-operation">
                <RUI.Upload ref="file" />
                <RUI.Button style={{marginLeft:15}} className="primary" onClick={this.submitHandler.bind(this)}>开始分析</RUI.Button>
                {this.state.list && this.state.list.length ? (
                    <RUI.Button style={{marginLeft:15}} onClick={this.downloadHandler.bind(this)}>下载Excel</RUI.Button>
                ) : null}
            </div>
            {this.state.list && this.state.list.length ? (
                <div className="row row-result">
                    <RUI.Table dataSource={this.state.list}>
                        <RUI.Column title="部门" dataField={"department"} />
                        <RUI.Column title="姓名" dataField={"name"} />
                        <RUI.Column title="加班开始时间" dataField={"start"} />
                        <RUI.Column title="加班结束时间" dataField={"end"} />
                        <RUI.Column title="总时长" dataField={"long"} />
                    </RUI.Table>
                </div>
            ) : null}
        </div></div>;
    }
}

export default connect(function(state) {
    return state;
}, {

})(CheckinView);
