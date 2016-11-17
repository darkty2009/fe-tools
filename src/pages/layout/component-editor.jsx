import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import RUI from 'react-component-lib';

import '../../style/component-editor.scss';

export default class ComponentEditor extends Component {
    constructor(props) {
        super(props);
    }

    setComponent(comp) {
        debugger;
        console.log(comp.props);
    }

    render() {
        return <div className="editor">

        </div>;
    }
}