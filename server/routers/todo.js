var parse = require('co-body');
var Route = require('koa-router');
var event = require('../model/todo.js');
var format = require('../util/format.js');

var route = new Route({
    prefix:'/todo'
});

route.get('/list', function *list() {
    this.type = 'application/json';
    var list = yield event.select("", "order by id desc,upload asc");
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
    var upload = post.upload || {};
    var type = upload.type;
    var hash = upload.hash;
    post = Object.assign({}, post, {
        upload: hash ? 1 : 0
    });
    var result = yield event.update(post);

    this.body = format(true, result);

    if(post.upload && type == 'zip') {
        try {
            var error = yield (function () {
                return new Promise(function (resolve, reject) {
                    var shell = `unzip ${hash} -d ppt-${post.id}`;
                    console.log(shell);
                    try {
                        child.exec(shell, {
                            cwd: path.resolve(__dirname, '../../upload')
                        }, function (err, out) {
                            if (!err) {
                                resolve(out)
                            } else {
                                resolve(err);
                            }
                        });
                    }catch(e) {
                        resolve(e);
                    }
                });
            })();
            console.log('unzip', error);
        }catch(e) {

        }
    }
});

module.exports = route.routes();
