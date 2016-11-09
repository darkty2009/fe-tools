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
                    {this.props.children ? this.props.children : (
                        <div className="default">
                            <h5>友情链接</h5>
                            <div className="links">
                                <div className="link"><RUI.Link href="http://10.2.50.99/" target="_blank">禅道</RUI.Link></div>
                                <div className="link"><RUI.Link href="http://10.1.100.232:8000/" target="_blank">办公系统</RUI.Link></div>
                                <div className="link"><RUI.Link href="http://gitlab.berbon.com" target="_blank">代码库</RUI.Link></div>
                                <div className="link"><RUI.Link href="http://showdoc.berbon.com" target="_blank">文档中心</RUI.Link></div>
                                <div className="link"><RUI.Link href="http://10.2.50.220/" target="_blank">原型库</RUI.Link></div>
                                <div className="link"><RUI.Link href="http://10.2.50.211/" target="_blank">羽毛球报名</RUI.Link></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>;
    }
}