import '../../style/components.scss';

export default {
    layout:[
        {title:'行', define:require('./components/row.jsx').default},
        {title:'列', define:require('./components/column.jsx').default}
    ],
    base:[
        {title:'按钮', define:require('./components/button.jsx').default},
        {title:'文本', define:require('./components/text.jsx').default},
        {title:'图片', define:require('./components/image.jsx').default},
        {title:'输入框', define:require('./components/input.jsx').default},
        {title:'文本域', define:require('./components/textarea.jsx').default},
        {title:'日期', define:require('./components/datepicker.jsx').default},
        {title:'开关', define:require('./components/switch.jsx').default},
        {title:'单选', define:require('./components/radio.jsx').default},
        {title:'多选', define:require('./components/checkbox.jsx').default},
        {title:'下拉菜单', define:require('./components/select.jsx').default}
    ],
    component:[
        {title:'表格', define:require('./components/table.jsx').default},
        {title:'分页', define:require('./components/pagination.jsx').default},
        {title:'数字调节器', define:require('./components/number-spinner.jsx').default},
        {title:'滑动条', define:require('./components/slider-spinner.jsx').default},
        {title:'轮播图', define:require('./components/slider.jsx').default}
    ]
};
