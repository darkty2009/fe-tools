var route = require('koa-router')();
var parse = require('co-body');
var koa = require('koa');
var serve = require('koa-static');
var fs = require('fs');
var fetch = require('node-fetch');
var path = require('path');

var process = require('process');
var ENV = process.env.NODE_ENV;

const app = koa();

route.get('/', index)
app.use(route.routes());

app.use(require('./routers/util.js'));
app.use(require('./routers/event.js'));
app.use(require('./routers/scanpay.js'));
app.use(require('./routers/todo.js'));

app.use(serve('.'));

console.log(ENV);
app.listen(ENV == 'production' ? 3001 : 3000);

function *index() {
    this.type = 'text/html; charset=utf-8';
    var file = path.resolve(__dirname, ENV == 'production' ? '../index_online.html' : '../index.html');
    var content = fs.readFileSync(file);
    this.body = content;
}
