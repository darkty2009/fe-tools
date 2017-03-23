var fetch = require('node-fetch');
var parse = require('co-body');
var Route = require('koa-router');
var path = require('path');
var fs = require('fs');
var md5 = require('md5');
var os = require('os');
var format = require('../util/format.js');
var body = require('koa-better-body');
var build = require('../model/build.js');

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

route.post('/upload/file', body({multipart:true}), function* file() {
    this.type = 'application/json';
    var files = this.request.files;
    var hash = "";
    var type = "";
    if(files && files.length) {
        try {
            hash = md5(Math.random().toString());
            var file = files[0];
            var newpath = path.resolve(__dirname, `../../upload/${hash}`);
            var stream = fs.createWriteStream(newpath);
            fs.createReadStream(file.path).pipe(stream);

            type = file.type.split('/')[1];
        }catch(e) {
            console.log('upload file error', files);
        }
    }

    this.body = format(true, {
        hash:hash,
        type:type || ""
    });
});

route.get('/generator', function *generator() {
    this.type = 'application/json';
    var result = yield build.add({
        time:Date.now()
    });
    this.body = format(true, result);
});

module.exports = route.routes();
