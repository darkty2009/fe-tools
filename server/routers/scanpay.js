var fetch = require('node-fetch');
var parse = require('co-body');
var Route = require('koa-router');
var path = require('path');
var fs = require('fs');
var child = require('child_process');
var format = require('../util/format.js');
var md5 = require('md5');

var route = new Route({
    prefix:'/scanpay'
});

var qrcodeProject = path.resolve(__dirname, '../../../qrcode-batch/');
if(!fs.existsSync(qrcodeProject)) {
    qrcodeProject = path.resolve(__dirname, '../../../../berbon/qrcode-batch/');
}

route.get('/history', function *history() {
    this.type = 'application/json';
    var files = fs.readdirSync(path.resolve(qrcodeProject, 'out'));
    this.body = format(true, files.map(function(item) {
        return item.match(/zip$/) ? item : null;
    }).filter(function(item) {
        return !!item;
    }));
});

route.get('/progress/:id', function *progress() {
    this.type = 'application/json';
    var id = this.params.id;
    if(id) {
        var batchNo = id.substring(0, 4);
        if(!fs.existsSync(path.resolve(qrcodeProject, id + '.log'))) {
            if(fs.existsSync(path.resolve(qrcodeProject, 'out/' + batchNo + '.zip'))) {
                this.body = format(true, 'complete');
            }else {
                this.body = format(true, 'not start');
            }
        }else {
            var error = yield (function () {
                return new Promise(function (resolve, reject) {
                    var shell = `tail -n 1 ${id}.log`;
                    console.log(shell);
                    child.exec(shell, {
                        cwd: qrcodeProject
                    }, function (err, out) {
                        if (!err) {
                            resolve(out)
                        } else {
                            resolve(err);
                        }
                    });
                });
            })();

            this.body = format(true, error);
        }
    }else {
        this.body = format(false, {}, '请传参数:id');
    }
});

route.get('/create/:id', function *create() {
    this.type = 'application/json';
    var id = this.params.id;
    var unique = id + md5(`${id}-${Date.now()}`);
    if(id) {
        var error = yield (function() {
            return new Promise(function(resolve, reject) {
                var shell = `sh create.sh ${id} ${unique}`;
                console.log(shell);
                child.exec(shell, {
                    cwd:qrcodeProject
                },function(err) {
                    if(!err) {
                        resolve(true);
                    }else {
                        resolve(err);
                    }
                });

                setTimeout(function() {
                    resolve(true);
                }, 1000);
            });
        })();

        if(error === true) {
            this.body = format(true, unique);
        }else {
            this.body = format(false, {}, error);
        }
    }
    else {
        this.body = format(false, {}, '请传参数: id');
    }
});

route.get('/download/:id', function *download() {
    var id = this.params.id;
    if(id) {
        if(!fs.existsSync(path.resolve(qrcodeProject, `out/${id}.zip`))) {
            this.type = 'application/json';
            this.body = format(false, {}, 'Not exist');
        }else {
            this.set('Content-disposition', 'attachment;filename=' + id + '.zip');
            var data = yield new Promise(function (resolve, reject) {
                fs.readFile(path.resolve(qrcodeProject, `out/${id}.zip`), function (err, data) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            }).then(function (data) {
                    return data
                }, function (err) {

                });

            this.body = data;
        }
    }else {
        this.type = 'application/json';
        this.body = format(false, {}, '请传参数:id');
    }
});

module.exports = route.routes();