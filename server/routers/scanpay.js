var fetch = require('node-fetch');
var parse = require('co-body');
var Route = require('koa-router');

var route = new Route({
    prefix:'/scanpay'
});

route.get('/history', function *history() {

});

route.get('/progress/:id', function *progress() {

});

route.get('/create/:id', function *create() {

});

route.get('/download/:id', function *download() {

});

module.exports = route.routes();