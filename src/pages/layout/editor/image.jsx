import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import RUI from 'react-component-lib';

class ImageDialog extends Component {
    constructor(props) {
        super(props);

        this.data = "";
    }

    dispatchChangeEvent() {
        if(this.props.onChange) {
            this.props.onChange(this.data);
        }
    }

    localFileChange(e) {
        debugger;
    }

    remoteFileChange(e) {
        this.data = e.target.value;
        this.dispatchChangeEvent();
    }

    render() {
        return <div>
            <div className="row dialog-open-row" style={{marginBottom:10}}>
                <label className="left" style={{marginRight:10}}>选择文件</label>
                <div className="left">
                    <RUI.Upload ref="localFile" />
                </div>
            </div>
            <div className="row dialog-open-row">
                <label className="left" style={{marginRight:10}}>远程URL</label>
                <div className="left">
                    <RUI.Input ref="remoteURL" className="medium" onBlur={this.remoteFileChange.bind(this)} />
                </div>
            </div>
        </div>;
    }
}

export default class ImageEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value:props.defaultValue || "",
            thumb:this.thumb(props.defaultValue || "")
        };
    }

    thumb(value) {
        if(value.indexOf('base64') == 0) {
            return 'base64';
        }
        return value;
    }

    openImageEditor() {
        RUI.DialogManager.confirm({
            title:"选择图片",
            message:<ImageDialog onChange={this.onImageChange.bind(this)} />,
            submit:this.imageSubmit.bind(this)
        });
    }

    onImageChange(data) {
        this.setState({
            value:data,
            thumb:this.thumb(data)
        });
    }

    imageSubmit() {
        if(this.props.onChange) {
            this.props.onChange();
        }
    }

    getValue() {
        return this.state.value;
    }

    render() {
        return <div>
            <RUI.Input defaultValue={this.state.thumb} mode="static" onFocus={this.openImageEditor.bind(this)} />
        </div>;
    }
}
