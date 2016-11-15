import React, {Component, PropTypes} from 'react';
import RUI from 'react-component-lib';
import {connect} from 'react-redux';

import '../style/qrcode.scss';

class QRCodeView extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    componentDidMount() {

    }

    create() {
        var content = this.refs.source.getValue();
        if(content.length > 200) {
            RUI.DialogManager.confirm({
                title:"提示",
                message:"文本内容过长，导致二维码不易被识别，是否继续生成？",
                submit:this.doCreate.bind(this)
            })
        }else {
            this.doCreate();
        }
    }

    doCreate() {
        var content = this.refs.source.getValue();
        $('.qrcode').qrcode({
            text:content,
            ECLevel:3,
            mode:4,
            margin:1
        });

        var width = $('.qrcode canvas').width();
        $('.qrcode canvas').width(width / (width / 265));
        $('.qrcode canvas').height(width / (width / 265));
    }

    open() {
        this.refs.openDialog.show();
    }

    openSubmit() {
        var files = this.refs.localFile.getValue();
        if(files && files.length > 0) {
            return this.readFile(files[0]).then((content)=>{
                this.decode(content);
            });
        }
        var url = this.refs.remoteURL.getValue();
        if(url) {
            return this.ajaxRemote(url).then((content)=>{
                this.decode(content);
            });
        }
    }

    readFile(file) {
        return new Promise((resolve, reject)=>{
            var reader = new FileReader();
            reader.onload = function() {
                resolve(this.result);
            };
            reader.readAsDataURL(file);
        });
    }

    ajaxRemote(url) {
        return new Promise((resolve, reject)=>{
            resolve('/util/proxy/' + encodeURIComponent(url));
        });
    }

    decode(content) {
        var _this = this;
        var image = document.createElement('img');
        image.onload = function() {
            var canvas = document.createElement('canvas');
            canvas.style.opacity = '0';
            document.body.appendChild(canvas);

            canvas.width = image.width;
            canvas.height = image.height;

            var context = canvas.getContext('2d');
            context.drawImage(image, 0, 0, image.width, image.height, 0, 0, image.width, image.height);

            try {
                var result = $(canvas).qrdecode();
                _this.refs.source.setState({value:result});
            }catch(e) {
                RUI.DialogManager.alert("解析失败，人家不是万能的啦");
            }

            document.body.removeChild(canvas);
        };
        image.src = content;
    }

    download() {
        var canvas = $('.qrcode canvas');
        if(canvas.length) {
            var formatter = new RUI.DateFormatter('Y-m-d H:i:s');
            var content = canvas[0].toDataURL('image/png');
            var a = document.createElement('a');
            a.download = 'qrcode-' + formatter.toString() + '.png';
            a.href = (content);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }

    render() {
        return <div className="row"><div className="page page-qrcode">
            <div className="row">
                <RUI.Textarea ref="source" className="source" placeholder="请输入文本" maxLengthHandler={()=>1} />
                <div className="result">
                    <div className="qrcode">

                    </div>
                </div>
            </div>
            <div className="row operations">
                <div className="button-group">
                    <RUI.Button onClick={this.create.bind(this)} className="primary">生成</RUI.Button>
                    <RUI.Button onClick={this.open.bind(this)}>解码</RUI.Button>
                    <RUI.Button onClick={this.download.bind(this)}>下载</RUI.Button>
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

})(QRCodeView);