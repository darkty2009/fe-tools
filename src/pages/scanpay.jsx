import React, {Component, PropTypes} from 'react';
import RUI from 'react-component-lib';
import {connect} from 'react-redux';

import '../style/scanpay.scss';

class ScanPayView extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    componentDidMount() {

    }

    render() {
        return <div className="row"><div className="page page-scanpay">

        </div></div>;
    }
}

export default connect(function(state) {
    return state;
}, {

})(ScanPayView);