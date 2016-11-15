import React, {Component} from 'react';
import { render } from 'react-dom';
import RUI from 'react-component-lib';
import { Link } from 'react-router';
import './layout.scss';

import links from '../local.json';

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
                {this.props.children ? this.props.children : (
                    <div className="row">
                        <div className="default">
                            <h5>友情链接</h5>
                            <div className="links">
                                {links && links.map(function(link, index) {
                                    return <div className="link" key={index}><RUI.Link href={link[1]} target="_blank">{link[0]}</RUI.Link></div>;
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>;
    }
}