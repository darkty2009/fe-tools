import React, {Component} from 'react';
import { render } from 'react-dom';
import RUI from 'react-component-lib';
import { Link } from 'react-router';
import './layout.scss';

export default class Layout extends Component {
    render() {
        return <div className="wrapper">
            <div className="header">
                <div className="row">
                    <ul className="navigator">
                        <li><Link to="/calendar" activeClassName="active">工作日历</Link></li>
                        <li><Link to="/layout" activeClassName="active">布局工具</Link></li>
                        <li><Link to="/jsonview" activeClassName="active">JSON格式化</Link></li>
                        <li><Link to="/qrcode" activeClassName="active">二维码</Link></li>
                    </ul>
                </div>
            </div>
            <div className="content">
                <div className="row">
                    {this.props.children}
                </div>
            </div>
        </div>;
    }
}