var parse = require('co-body');
var Route = require('koa-router');
var layout = require('../model/layout.js');
var format = require('../util/format.js');
var data = [
    {
        id:1,
        title:'列表',
        content:[
            {title:'行', type:'row', content:[
                {title:'列', type:'column',content:[
                    {title:'文本', type:'text'},
                    {title:'输入框', type:'input',style:{width:'150px'}},
                ]},
                {title:'列', type:'column',content:[
                    {title:'文本', type:'text'},
                    {title:'输入框', type:'input',style:{width:'150px'}},
                ]},
                {title:'列', type:'column',content:[
                    {title:'文本', type:'text'},
                    {title:'输入框', type:'input',style:{width:'150px'}},
                ]},
                {title:'列', type:'column',content:[
                    {title:'按钮', type:'button'},
                ]},
            ]},
            {title:'行', type:'row', content:[
                {title:'列', type:'column',content:[
                    {title:'表格', type:'table'}
                ]},
            ]},
            {title:'行', type:'row', content:[
                {title:'列', type:'column',content:[
                    {title:'分页', type:'pagination'}
                ]},
            ]}
        ]
    }
];

var route = new Route({
    prefix:'/layout'
});

route.get('/list', function *list() {
    this.type = 'application/json';
    var list = yield data;
    //var list = yield layout.select();
    this.body = format(true, list);
});

route.post('/add', function *add() {
    this.type = 'application/json';
    var post = yield parse.form(this);
    var result = yield layout.add(post);
    this.body = format(true, result);
});

route.post('/edit', function *edit() {
    this.type = 'application/json';
    var post = yield parse.form(this);
    var result = yield layout.update(post);
    this.body = format(true, result);
});

module.exports = route.routes();