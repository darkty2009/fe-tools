import '../../style/components.scss';

export default {
    layout:[
        {title:'行', define:require('./components/row.jsx').default},
        {title:'列', define:require('./components/column.jsx').default}
    ],
    base:[
        {title:'按钮', define:require('./components/button.jsx').default},
        {title:'文本', define:require('./components/text.jsx').default}
    ],
    component:[

    ]
};