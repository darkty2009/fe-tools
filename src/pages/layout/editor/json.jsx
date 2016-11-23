import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import RUI from 'react-component-lib';
import JSONEditor from 'jsoneditor';
import '../../../style/jsonview.scss';

export default class JSONCustomEditor extends Component {
    static defaultProps = {
        mode:'tree'
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.source = new JSONEditor(document.getElementById('json-target'), {
            mode:this.props.mode,
            onChange:this.onSourceChange.bind(this, true)
        });
        this.source.set(this.props.value);
    }

    componentWillRecieveProps(nextProps) {
        this.source.set(nextProps.value);
    }

    onSourceChange() {
        if(this.props.onChange) {
            try {
                var value = this.getValue();
                this.props.onChange(value);
            }catch(e) {
                
            }
        }
    }

    getValue() {
        return this.source.get();
    }

    render() {
        return <div className="editor-dialog-json">
            <div className="jsonviews">
                <div className="json-flex" id="json-target">

                </div>
            </div>
        </div>
    }
}
