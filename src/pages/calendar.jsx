import React, {Component, PropTypes} from 'react';
import RUI from 'react-component-lib';
import {connect} from 'react-redux';
import { getCalEventList, addCalEvent, editCalEvent } from '../actions/calendar.jsx';

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
            edit:{}
        };

        this.openEdit = this.openEdit.bind(this);
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
            start_time:times.startValue,
            end_time:times.endValue,
            status,
            remark
        });
    }

    editHandler() {
        var title = this.refs.editTitle.getValue();
        var name = this.refs.editName.getValue();
        var times = this.refs.editTimes.getValue();
        var status = this.refs.editStatus.getValue();
        var remark = this.refs.editRemark.getValue();

        this.props.editCalEvent({
            title,
            name,
            start_time:times.startValue,
            end_time:times.endValue,
            status,
            remark,
            id:this.state.edit.id
        });

        this.refs.editDialog.hide();
    }

    closeHandler() {
        this.setState({
            edit:{}
        });
    }

    openEdit(event) {
        this.setState({
            edit:Object.assign({}, event)
        }, ()=>{
            this.refs.editDialog.show();

            this.refs.editTimes.setValue({
                startValue:this.state.edit.start_time * 1,
                endValue:this.state.edit.end_time * 1
            });
        });
    }

    render() {
        return <div className="page">
            <div className="calendar-container">
                {this.state.sizeComplete && <BigCalendar
                    events={this.props.events.map((event)=>{
                        event.openHandler = this.openEdit;
                        return event;
                    })}
                    messages={local.messages}
                    components={{
                        toolbar: require('./calendar/toolbar.jsx').default,
                        event: require('./calendar/normal_event.jsx').default
                    }}
                    view={'week'}
                    onSelectEvent={this.openEdit.bind(this)}
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
            {this.state.edit.id && (
                <RUI.Dialog key={this.state.edit.id} ref="editDialog" title={"编辑事件"} buttons={"submit,cancel"} submitText={"保存"} onSubmit={this.editHandler.bind(this)} onClose={this.closeHandler.bind(this)}>
                    <div className="dialog-content">
                        <div className="dialog-row">
                            <label className="dialog-row-label">任务：</label>
                            <div className="dialog-row-content">
                                <RUI.Input ref="editTitle" defaultValue={this.state.edit.title} />
                            </div>
                        </div>
                        <div className="dialog-row">
                            <label className="dialog-row-label">人名：</label>
                            <div className="dialog-row-content">
                                <RUI.Input ref="editName" defaultValue={this.state.edit.name} />
                            </div>
                        </div>
                        <div className="dialog-row">
                            <label className="dialog-row-label">时限：</label>
                            <div className="dialog-row-content">
                                <RUI.DatePicker ref="editTimes" range={true} showTime={true} />
                            </div>
                        </div>
                        <div className="dialog-row">
                            <label className="dialog-row-label">状态：</label>
                            <div className="dialog-row-content">
                                <RUI.RadioGroup ref="editStatus" defaultValue={this.state.edit.status}>
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
                                <RUI.Textarea ref="editRemark" value={this.state.edit.remark} maxLength={200} />
                            </div>
                        </div>
                    </div>
                </RUI.Dialog>
            )}
        </div>;
    }
}

export default connect(function(state) {
    return state.calenderReducer;
}, {
    getCalEventList,
    addCalEvent,
    editCalEvent
})(Calendar);