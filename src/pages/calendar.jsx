import React, {Component, PropTypes} from 'react';
import RUI from 'react-component-lib';
import {connect} from 'react-redux';
import { getCalEventList, addCalEvent } from '../actions/calendar.jsx';

import '../style/calendar.scss';
import BigCalendar from 'react-big-calendar';
import local from '../common/local.jsx';

BigCalendar.setLocalizer(
    BigCalendar.globalizeLocalizer(local)
);

class Calendar extends Component {

    static childContextTypes = {
        calendar: PropTypes.object
    }

    static contextTypes = {
        store: PropTypes.func,
    }

    static defaultProps = {
        events:[]
    }

    getChildContext() {
        return {
            calendar:this
        };
    }

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    componentDidMount() {
        $('.calendar-container').height(Math.max(580, $(window).height() - 45 - 20));
        this.setState({
            sizeComplete:true
        }, ()=>{
            this.props.getCalEventList();
        });
    }

    componentWillReceiveProps(nextProps) {

    }

    onAddEvent() {
        this.refs.addDialog.show();
    }

    submitHandler() {
        var title = this.refs.title.getValue();
        var name = this.refs.name.getValue();
        var times = this.refs.times.getValue();
        var status = this.refs.status.getValue();
        var remark = this.refs.remark.getValue();

        this.props.addCalEvent({
            title,
            name,
            start:times.startValue,
            end:times.endValue,
            status,
            remark
        });
    }

    render() {
        return <div className="page">
            <div className="calendar-container">
                {this.state.sizeComplete && <BigCalendar
                    events={this.props.events}
                    messages={local.messages}
                    components={{
                        toolbar: require('./calendar/toolbar.jsx').default,
                        event: require('./calendar/normal_event.jsx').default
                    }}
                />}
            </div>
            <RUI.Dialog ref="addDialog" title={"新增事件"} buttons={"submit,cancel"} submitText={"保存"} onSubmit={this.submitHandler.bind(this)}>
                <div className="dialog-content">
                    <div className="dialog-row">
                        <label className="dialog-row-label">任务：</label>
                        <div className="dialog-row-content">
                            <RUI.Input ref="title" />
                        </div>
                    </div>
                    <div className="dialog-row">
                        <label className="dialog-row-label">人名：</label>
                        <div className="dialog-row-content">
                            <RUI.Input ref="name" />
                        </div>
                    </div>
                    <div className="dialog-row">
                        <label className="dialog-row-label">时限：</label>
                        <div className="dialog-row-content">
                            <RUI.DatePicker ref="times" range={true} showTime={true} />
                        </div>
                    </div>
                    <div className="dialog-row">
                        <label className="dialog-row-label">状态：</label>
                        <div className="dialog-row-content">
                            <RUI.RadioGroup ref="status" defaultValue={"normal"}>
                                <RUI.Radio value={"normal"}><span className="circle circle-normal">正常</span></RUI.Radio>
                                <RUI.Radio value={"easy"}><span className="circle circle-easy">低优先级</span></RUI.Radio>
                                <RUI.Radio value={"gogogo"}><span className="circle circle-gogogo">加急</span></RUI.Radio>
                                <RUI.Radio value={"warning"}><span className="circle circle-warning">高风险</span></RUI.Radio>
                            </RUI.RadioGroup>
                        </div>
                    </div>
                    <div className="dialog-row clearfix">
                        <label className="dialog-row-label">备注：</label>
                        <div className="dialog-row-content" style={{width:323}}>
                            <RUI.Textarea ref="remark" maxLength={200} />
                        </div>
                    </div>
                </div>
            </RUI.Dialog>
        </div>;
    }
}

export default connect(function(state) {
    return state.calenderReducer;
}, {
    getCalEventList,
    addCalEvent
})(Calendar);