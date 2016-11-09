var route = require('koa-router')();
var parse = require('co-body');
var koa = require('koa');
var fs = require('fs');
var fetch = require('node-fetch');

var process = require('process');
var ENV = process.env.NODE_ENV;

const app = koa();

route.get('/', index)
app.use(route.routes());

app.use(require('./routers/util.js'));
app.use(require('./routers/event.js'));

app.listen(ENV == 'production' ? 80 : 3000);

function *index() {
    this.type = 'text/html; charset=utf-8';
    this.body = fs.readFileSync(ENV == 'production' ? './index_online.html' : './index.html');
}