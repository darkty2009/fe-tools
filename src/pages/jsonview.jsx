import React, {Component, PropTypes} from 'react';
import RUI from 'react-component-lib';
import {connect} from 'react-redux';

import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.min.css';

import '../style/jsonview.scss';

class JSONView extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };

        this.hasModify = false;
    }

    componentDidMount() {
        $(window).on('resize', function() {
            $('.jsonviews').height(Math.max(320, $(window).height() - 45 - 20 - 55));
        }).trigger('resize');

        this.target = new JSONEditor(document.getElementById('json-target'), {
            mode:'view'
        });
        this.source = new JSONEditor(document.getElementById('json-source'), {
            mode:'code',
            onChange:this.onSourceChange.bind(this, true)
        });
    }

    onSourceChange(e) {
        try {
            var current = this.source.get();
            this.target.set(current);

            if(e) {
                this.hasModify = true;
            }else {
                this.hasModify = false;
            }
        }catch(e) {

        }
    }

    clear() {
        if(this.hasModify) {
            RUI.DialogManager.confirm({
                title:"是否清空数据",
                message:"您已修改过内容，立即清空会丢失当前数据",
                submitText:"清空",
                submit:()=>{
                    this.source.setText("{}");
                    this.onSourceChange();
                }
            });
        }else {
            this.source.setText("{}");
            this.onSourceChange();
        }
    }

    save() {
        var formatter = new RUI.DateFormatter('Y-m-d H:i:s');
        var content = this.source.getText();
        var a = document.createElement('a');
        a.download = 'document-' + formatter.toString() + '.json';
        a.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(content);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    openSubmit() {
        var files = this.refs.localFile.getValue();
        if(files && files.length > 0) {
            return this.readFile(files[0]).then((content)=>{
                this.source.setText(content);
                this.onSourceChange();
            });
        }
        var url = this.refs.remoteURL.getValue();
        if(url) {
            return this.ajaxRemote(url).then((content)=>{
                if(typeof content == 'object') {
                    this.source.set(content);
                }else {
                    this.source.setText(content);
                }
                this.onSourceChange();
            });
        }
    }

    readFile(file) {
        return new Promise((resolve, reject)=>{
            var reader = new FileReader();
            reader.onload = function() {
                resolve(this.result);
            };
            reader.readAsText(file);
        });
    }

    ajaxRemote(url) {
        return new Promise((resolve, reject)=>{
            $.ajax({
                url:'/util/proxy/' + encodeURIComponent(url),
                dataType:"json",
                success:function(response) {
                    resolve(response);
                }
            })
        });
    }

    render() {
        return <div className="row"><div className="page">
            <div className="operations">
                <div className="button-group">
                    <RUI.Button onClick={this.clear.bind(this)}>清空</RUI.Button>
                    <RUI.Button onClick={()=>this.refs.openDialog.show()}>打开</RUI.Button>
                    <RUI.Button onClick={this.save.bind(this)}>保存</RUI.Button>
                </div>
            </div>
            <div className="jsonviews">
                <div className="json-flex" id="json-source">

                </div>
                <div className="json-flex" id="json-target">

                </div>
            </div>
            <RUI.Dialog ref="openDialog" buttons={"submit,cancel"} onSubmit={this.openSubmit.bind(this)} title="选择">
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
                            <p style={{color:"#999"}}>肯定是需要允许跨域的接口，你懂的</p>
                        </div>
                    </div>
                </div>
            </RUI.Dialog>
        </div></div>;
    }
}

export default connect(function(state) {
    return state;
}, {

})(JSONView);