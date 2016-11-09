var fetch = require('node-fetch');
var parse = require('co-body');
var Route = require('koa-router');

var route = new Route({
    prefix:'/util'
});

route.get('/proxy/:url', function *proxy() {
    if(this.params.url) {
        var _this = this;
        this.body = yield fetch(this.params.url).then(function(response) {
            _this.type = response.headers.get('content-type');
            if(_this.type.indexOf('image') > -1) {
                return response.buffer();
            }else {
                return response.text();
            }
        });
    }else {
        this.body = "";
    }
});

module.exports = route.routes();