var parse = require('co-body');
var Route = require('koa-router');
var event = require('../model/todo.js');
var format = require('../util/format.js');

var route = new Route({
    prefix:'/todo'
});

route.get('/list', function *list() {
    this.type = 'application/json';
    var list = yield event.select();
    this.body = format(true, list);
});

route.post('/add', function *add() {
    this.type = 'application/json';
    var post = yield parse.form(this);
    var result = yield event.add(post);
    this.body = format(true, result);
});

route.post('/edit', function *edit() {
    this.type = 'application/json';
    var post = yield parse.form(this);
    var result = yield event.update(post);
    this.body = format(true, result);
});

module.exports = route.routes();
