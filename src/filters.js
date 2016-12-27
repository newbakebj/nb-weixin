// 过滤器工具类
let format = (value) => {
    return value >= 10 ? value : '0' + value
};
/**
 * 时间格式化
 */
export const dateFilter = (time, type) => {
    let date = new Date(time);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let second = date.getSeconds();
    let result;
    switch (type) {
        case 0: // 01-05
            result = `${format(month)}-${format(day)}`;
            break;
        case 1: // 11:12
            result = `${format(hours)}-${format(minutes)}`;
            break;
        case 2: // 2015-01-05
            result = `${year}-${format(month)}-${format(day)}`;
            break;
        case 3: // 2015-01-05 11:12
            result = `${year}-${format(month)}-${format(day)}  ${format(hours)}:${format(minutes)}`;
            break;
        case 4: // 2015-01-05 11:12:06
            result = `${year}-${format(month)}-${format(day)}  ${format(hours)}:${format(minutes)}:${format(second)}`;
            break;
        case 5: // 1小时前
            let currentDate = new Date();
            let tempTime = currentDate.getTime();
            let timeGap = tempTime - time;
            let minuteGap = 60 * 1000;
            let hourGap = 60 * minuteGap;
            let dayGap = 12 * hourGap;
            let fullGap = 15 * dayGap;
            if (minuteGap > timeGap) {
                result = '刚刚';
            } else if (hourGap > timeGap) {
                result = Math.floor(timeGap / minuteGap) + '分钟前';
            } else if (dayGap > timeGap) {
                result = Math.floor(timeGap / hourGap) + '小时前';
            } else if (fullGap > timeGap) {
                result = Math.floor(timeGap / dayGap) + '天前';
            } else {
                result = `${year}-${format(month)}-${format(day)}  ${format(hours)}:${format(minutes)}`;
            }
            break;
        default:
            break;
        
    }
    return result;
};