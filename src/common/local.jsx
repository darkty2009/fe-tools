import RUI from 'react-component-lib';

function weekDay(result) {
    if(result == '00') {
        return '星期天';
    }
    if(result == '01') {
        return '星期一';
    }
    if(result == '02') {
        return '星期二';
    }
    if(result == '03') {
        return '星期三';
    }
    if(result == '04') {
        return '星期四';
    }
    if(result == '05') {
        return '星期五';
    }
    if(result == '06') {
        return '星期六';
    }
}

export default {
    parse:function() {
        console.log('parse', arguments);
    },
    format:function(date, format, arg) {
        var formatter = new RUI.DateFormatter();
        formatter.setSource(date);

        format = format.replace('dd/MM', 'm月d号')
                    .replace('dddd', '(D)')
                    .replace('ddd', '(D)')
                    .replace('dd', 'd号')
                    .replace('t', 'H:00')
                    .replace('Y', 'Y年m月')
                    .replace('MMM', 'm月')
                    .replace('MM', 'm');

        formatter.setPattern(format);

        var result = formatter.toString();
        result = result.replace(/\((\d+)\)/g, function(match, date) {
            return weekDay(date);
        });

        return result;
    },
    startOfWeek:function() {
        console.log('start', arguments);
    },
    culture:function() {
        return {
            calendar:{
                firstDay:1
            }
        }
    },
    messages:{
        showMore: function() {
            return <span>更多</span>;
        },
        today : '今天',
        previous : '向前',
        next : '向后',
        month : '月',
        week : '周',
        day : '天',
        agenda : '事件',
        allDay : '全天',
        date : '日期',
        time : '时间',
        event : '事件'
    }
};