import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import RUI from 'react-component-lib';

class ImageDialog extends Component {
    constructor(props) {
        super(props);
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
                    <RUI.Input ref="remoteURL" className="medium" />
                </div>
            </div>
        </div>;
    }
}

export default class ImageEditor extends Component {
    constructor(props) {
        super(props);
    }

    openImageEditor() {
        RUI.DialogManager.confirm({
            title:"选择图片",
            message:<ImageDialog onChange={this.onImageChange.bind(this)} />,
            submit:this.imageSubmit.bind(this)
        });
    }

    onImageChange(data) {

    }

    imageSubmit() {

    }

    render() {
        return <div>
            <RUI.Input defaultValue={this.props.defaultValue} mode="static" onFocus={this.openImageEditor.bind(this)} />
        </div>;
    }
}
