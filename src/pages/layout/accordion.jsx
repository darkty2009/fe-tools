import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import RUI from 'react-component-lib';

import '../../style/accordion.scss';

export default class Accordion extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var node = $(ReactDOM.findDOMNode(this));
        node.on('click', function(e) {
            if (e.offsetY < 33 && $(e.target).hasClass('accordion')) {
                $(this).toggleClass('expand');
                if ($(this).hasClass('expand')) {
                    $(this).css({
                        height: 33 + $(this).children().length * 44
                    });
                } else {
                    $(this).css({
                        height: 33
                    })
                }
            }
        });
    }

    render() {
        return <ul className={"accordion"} title={this.props.title}>
            {React.Children.map(this.props.children, function(child, index) {
                return <li className="accordion-item" key={index}>
                    {child}
                </li>
            })}
        </ul>;
    }
}