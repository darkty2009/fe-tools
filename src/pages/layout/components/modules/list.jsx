/**
 * Created by lianghj on 2017/2/8.
 */
export default [
    {title:'行', define:require('../row.jsx').default, content:[
        {title:'列', define:require('../column.jsx').default,content:[
            {title:'文本', define:require('../text.jsx').default},
            {title:'输入框', define:require('../input.jsx').default ,style:{width:'150px'}},
        ]},
        {title:'列', define:require('../column.jsx').default,content:[
            {title:'文本', define:require('../text.jsx').default},
            {title:'输入框', define:require('../input.jsx').default},
        ]},
        {title:'列', define:require('../column.jsx').default,content:[
            {title:'文本', define:require('../text.jsx').default},
            {title:'输入框', define:require('../input.jsx').default},
        ]},
        {title:'列', define:require('../column.jsx').default,content:[
            {title:'按钮', define:require('../button.jsx').default},
        ]},
    ]},
    {title:'行', define:require('../row.jsx').default, content:[
        {title:'列', define:require('../column.jsx').default,content:[
            {title:'表格', define:require('../table.jsx').default}
        ]},
    ]},
    {title:'行', define:require('../row.jsx').default, content:[
        {title:'列', define:require('../column.jsx').default,content:[
            {title:'分页', define:require('../pagination.jsx').default}
        ]},
    ]}
];