var parse = require('co-body');
var Route = require('koa-router');
var format = require('../util/format.js');
var xlsx = require('node-xlsx').default;
var fs = require('fs');
var path = require('path');

var route = new Route({
    prefix:'/checkin'
});

function localeTime(time) {
    return time;

    // var locale = new time.Date(time);
    // locale.setTimezone('Asia/Shanghai');
    // return locale.getTime();
}

function sameday(time1, time2) {
    var date1 = new Date(time1);
    var date2 = new Date(time2);
    return date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate();
}

function dateString(time, justStart) {
    var d = new Date(time);
    if(justStart) {
        return `${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()} 18:30:00`;
    }else {
        return `${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()<10?'0'+d.getSeconds():d.getSeconds()}`;
    }
}

function hourString(half) {
    var arr = ((half/2)+"").split('.');
    var result = arr[0];
    if(arr[1]) {
        result += ":30:00";
    }else {
        result += ":00:00";
    }
    return result;
}

function parseExcel(hash) {
    var filepath = path.resolve(__dirname, '../../upload/' + hash);
    var sheets = xlsx.parse(filepath);
    if(sheets && sheets.length) {
        var sheet = sheets[0];
        sheet.data.shift();
        var list = sheet.data;
        var table = [];
        var last = {};
        list.forEach(function(item) {
            var name = item[1];
            var time = localeTime(Date.parse(item[3]));
            if((name == last.name && sameday(last.time, time)) || (name !== last.name && (time%86400000)>=43200000)) {
                var hours = time % 86400000;
                var check = (hours/ 1800000) + "";
                if(check.match(/\.9[3-9]/)) {
                    hours = Math.ceil(hours / 1800000);
                }else {
                    hours = Math.floor(hours/ 1800000);
                }
                if(hours >= 24) {
                    var halfhours = (time - time % 86400000) + (hours+16) * 1800000 - 8 * 3600000;
                    var item = {
                        department:item[0],
                        name:name,
                        start:dateString(time, true),
                        end:dateString(halfhours),
                        long:hourString(hours - 21)
                    };

                    var lastitem = table[table.length-1];
                    if(lastitem) {
                        var lastitemtime = new Date(lastitem.end);
                        var itemtime = new Date(item.end);
                        if(lastitemtime.getFullYear() == itemtime.getFullYear() && lastitemtime.getMonth()==itemtime.getMonth()&&lastitemtime.getDate()==itemtime.getDate()) {
                            table.pop();
                        }
                    }
                    table.push(item);
                }
            }
            last = {
                name:name,
                time:time
            };
        });

        return table;
    }else {
        return null;
    }
}

route.get('/export/:hash', function *expor() {
    this.type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

    var hash = this.params.hash;
    var result = parseExcel(hash);
    var lasttime = "";

    var exportData = [
        ['序号', '公司', '申请人部门', '申请人姓名', '加班开始时间', '加班结束时间', '总时长', '领导签字']
    ];
    result.forEach(function(item, index) {
        exportData.push([
            index+1,
            '成都通行',
            item.department,
            item.name,
            item.start,
            item.end,
            item.long,
            ''
        ]);
        lasttime = item.end;
    });

    var title = "";
    if(lasttime) {
        var date = new Date(lasttime);
        title = "加班调休" + (date.getMonth() + 1) + '月.xlsx';
    }else {
        title = "加班调休.xlsx";
    }

    this.set('Content-Disposition', 'attachment; filename=' + encodeURIComponent(title));

    var buffer = xlsx.build([{name: "Sheet1", data: exportData}]);
    this.body = buffer;
});

route.get('/parse/:hash', function *parse() {
    this.type = 'application/json';

    var hash = this.params.hash;
    var result = parseExcel(hash);
    this.body = format(true, {
        hash:hash,
        list:result
    });
});

module.exports = route.routes();
