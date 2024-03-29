
// Date functions for AT&T written by Rick Medved
//-----------------------------------------------
function getDateObjFromJSDate(dateStr = '') {
    // formats:
    // 2019-05-08T15:00:49-07:00
    // Wed Jun 03 2020 07:31:19 GMT-0700 (Pacific Daylight Time)
    // or blank for now
    var now = new Date();
    var dt = new Date();
    if (dateStr)
        dt = new Date(dateStr);

    if (dt.toString() == 'Invalid Date') {
        var items = dateStr.split(' ');
        var items2 = items[0].split('-');
        if (items2.length == 3) {
            var day = parseInt(items2[2]);
            var month = parseInt(items2[1]);
            var year = parseInt(items2[0]);
            var formattedDate = month + '/' + day + '/' + year + ' ' + items[1];
            dt = new Date(formattedDate);
        }
    }
    var timeDiff = now.getTime() - dt.getTime();
    var daysAgo = parseInt(timeDiff / 1000 / 60 / 60 / 24);
    var distanceAway = '-';
    if (now.toLocaleDateString() == dt.toLocaleDateString())
        distanceAway = 'Today';
    else if (daysAgo == 1)
        distanceAway = 'Yesterday';
    else if (daysAgo == -1)
        distanceAway = 'Tomorrow';
    else if (daysAgo > 0)
        distanceAway = daysAgo + ' days ago';
    else
        distanceAway = (daysAgo * -1).toString() + ' days from now';

    var timeTillEvent = distanceAway;
    if (timeTillEvent == 'Today') {
        var hoursAway = parseInt(timeDiff * -1 / 1000 / 60 / 60);
        var minutesAway = parseInt(timeDiff * -1 / 1000 / 60);
        timeTillEvent = minutesAway + ' minutes';
        if (minutesAway > 90) {
            timeTillEvent = hoursAway + ' hours';
            if (hoursAway == 1)
                timeTillEvent = hoursAway + ' hour';

        }
    }
    var nowLocal = now.toLocaleDateString();
    var time = dt.toLocaleTimeString();
    var segments = time.split(' ');
    if (segments && segments.length > 1)
        time = segments[0];
    var tomorrowLocal = new Date(now.getTime() + (3600000 * 24)).toLocaleDateString();
    var yesterdayLocal = new Date(now.getTime() - (3600000 * 24)).toLocaleDateString();
    var getTimezoneOffset = new Date().getTimezoneOffset();
    // 420 for pacific TZ
    //    getTimezoneOffset -= 480; // mountain time (no good)
    var mountainTZ = 360;
    var tzDiff = getTimezoneOffset - mountainTZ;
    var localDt = new Date(dt.getTime() - tzDiff * 1000 * 60);


    if (dt.toLocaleDateString() == nowLocal)
        distanceAway = 'Today';
    if (dt.toLocaleDateString() == yesterdayLocal)
        distanceAway = 'Yesterday';
    if (dt.toLocaleDateString() == tomorrowLocal)
        distanceAway = 'Tomorrow';
    return {
        jsDate: dt.toString(),
        legacy: convertDateToString(dt),
        oracle: oracleDateStampFromDate(dt),
        local: localDt.toLocaleDateString() + ' ' + localDt.toLocaleTimeString(),
        localDate: localDt.toLocaleDateString(),
        localTime: localDt.toLocaleTimeString(),
        localTime2: localDt.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
        localDt: localDt,
        time: time,
        getTime: dt.getTime(),
        mo: dt.getMonth() + 1,
        month: monthName(dt),
        prevMonth: monthNameByNumber(dt.getMonth()),
        year: dt.getFullYear(),
        prevYear: (dt.getMonth() > 0) ? dt.getFullYear() : dt.getFullYear() - 1,
        getTimeHexFormat: dt.getTime().toString(16),
        getTime32: dt.getTime().toString(32),
        html5Date: dateComponentFromDateStamp(dt),
        html5Time: dateComponentFromDateStamp(dt, true),
        secondsAgo: parseInt(timeDiff / 1000),
        timeTillEvent: timeTillEvent,
        minutesFromNow: parseInt(timeDiff * -1 / 1000 / 60),
        hoursFromNow: parseInt(timeDiff * -1 / 1000 / 3600),
        daysAgo: daysAgo,
        day: dt.getDay(),
        dayOfMonth: dt.getDate(),
        dayOfWeek: dayOfWeek(dt.getDay()),
        distanceAway: distanceAway,
        getTimezoneOffset: getTimezoneOffset,
        lastLoginColor: lastLoginColorFromDaysAgo(daysAgo, parseInt(timeDiff / 1000))
    }
}
function lastLoginText(lastLogin) {
    var dateObj = getDateObjFromJSDate(lastLogin);
    var lastLoginText = dateObj.daysAgo + ' Days ago';
    if (dateObj.daysAgo == 0)
        lastLoginText = 'Today';
    if (dateObj.daysAgo == 1)
        lastLoginText = 'Yesterday';

    if (dateObj.secondsAgo <= 15 * 60) {

        lastLoginText = 'Online Now!';
    }
    return lastLoginText;
}
function lastLoginSrc(lastLogin) {
    var dateObj = getDateObjFromJSDate(lastLogin);
    var lastLoginSrc = 'assets/images/blackCircle.png';
    if (dateObj.daysAgo <= 14)
        lastLoginSrc = 'assets/images/redCircle.png';
    if (dateObj.daysAgo <= 7)
        lastLoginSrc = 'assets/images/yellowCircle.png';
    if (dateObj.daysAgo == 0)
        lastLoginSrc = 'assets/images/blueCircle.png';
    if (dateObj.secondsAgo <= 15 * 60) {
        lastLoginSrc = 'assets/images/greenCircle.png';
    }
    return lastLoginSrc;
}
function lastLoginColorFromDaysAgo(daysAgo, secondsAgo) {
    var lastLoginColor = 'black';
    if (daysAgo <= 14)
        lastLoginColor = 'red';
    if (daysAgo <= 7)
        lastLoginColor = 'orange';
    if (daysAgo <= 2)
        lastLoginColor = 'blue';
    if (daysAgo == 0)
        lastLoginColor = 'cyan';
    if (secondsAgo <= 15 * 60) {
        lastLoginColor = '#00CC00';
    }
    return lastLoginColor;
}
function lastLoginColor(lastLogin) {
    var dateObj = getDateObjFromJSDate(lastLogin);

    return lastLoginColorFromDaysAgo(dateObj.daysAgo, dateObj.secondsAgo);
}
function getDateObjFromHtml5Date(dateStr = '2019-06-15', timeStr = '00:00') {
    return getDateObjFromJSDate(dateFromHtml5Time(dateStr, timeStr));
}
function monthName(date) {
    var month = date.getMonth();
    return monthNameByNumber(month + 1);
}
function netTrackerMonth() {
    var now = new Date();
    return now.getFullYear().toString() + pad(now.getMonth() + 1);
}
function monthNameByNumber(num) {
    mlist = ["December", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return mlist[num];
};
function nowYear() {
    var now = new Date();
    return now.getFullYear();
}
function pad(n = 0, width = 2, z = '0') {
    var str = n.toString();
    return str.length >= width ? str : new Array(width - str.length + 1).join(z) + str;
}
function secondsSinceDateStamp(dateStamp) {
    var date1 = new Date(dateStamp);
    var now = new Date();
    var diff = diffBetweenTwoDates(now, date1);
    return Math.ceil(diff / 1000);
}
function ptpTimeFromStamp(dt) {
    var date = new Date(dt);
    return convertDateToString(date);
}
function convertDateToString(d) {
    if (!d)
        return;
    var day = pad(d.getDate());
    var monthIndex = pad(d.getMonth() + 1);
    var year = d.getFullYear();
    var h2 = d.getHours();
    var h = hours12(d);
    var m = pad(d.getMinutes());
    var amPm = 'AM';
    if (h2 >= 12) {
        amPm = 'PM';
    }

    return monthIndex + '/' + day + '/' + year + ' ' + h + ':' + m + ':00 ' + amPm;
}
function hours12(date) { return (date.getHours() + 24) % 12 || 12; }
function isHtml5TimeInFuture(dayStr, timeStr) {
    var date1 = dateFromHtml5Time(dayStr, timeStr);
    var now = new Date();
    var diff = diffBetweenTwoDates(date1, now);
    return diff > 0;
}
function daysTillDate(dateStr) {
    var date1 = new Date(dateStr);
    var now = new Date();
    var diff = diffBetweenTwoDates(date1, now);
    var days = Math.ceil(diff / 1000 / 86400);
    return days;
}
function minutesBetween2DateStamps(dateStr1, dateStr2) {
    var date1 = new Date(dateStr1);
    var date2 = new Date(dateStr2);
    var diff = diffBetweenTwoDates(date2, date1);
    return Math.ceil(diff / 1000 / 60);
}
function diffBetweenTwoDates(date1, date2) {
    return date1.getTime() - date2.getTime();
}
function dateFromHtml5Time(dayStr, timeStr) {
    return new Date(dayStr + ' ' + timeStr);
}
function dateStampFromHtml5Time(dayStr, timeStr) {
    var now = new Date();
    var hours = Math.floor(now.getTimezoneOffset() / 60);
    var sign = (hours >= 0) ? '-' : '+';
    return dayStr + 'T' + timeStr + ':00' + sign + pad(hours) + ':00';
}
function localTimeFromStamp(dateStamp) {
    return dateComponentFromDateStamp(dateStamp, true, true);
}
function weekdayOfDate(dateStamp) {
    var dateSt = new Date();
    if (dateStamp)
        dateSt = new Date(dateStamp);

    var day = dateSt.getDay();
    return dayOfWeek(day);
}
function dayOfWeek(number) {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[number];
}
function timeOfDayOfDate(dateStamp) {
    var dateSt = new Date();
    if (dateStamp)
        dateSt = new Date(dateStamp);
    var hour = pad(dateSt.getHours());

    if (hour >= 4 && hour < 12)
        return 'Morning';
    if (hour >= 12 && hour < 5)
        return 'Afternoon';
    if (hour >= 5 && hour < 9)
        return 'Evening';

    return 'Night';
}
function convertStringToDate(str) {
    if (!str)
        return new Date();
    var items = str.split(" ");
    var dayStr = stringVal(items[0]);
    var hourMin = stringVal(items[1]);
    var amPm = stringVal(items[2]);

    var dayItems = dayStr.split("/");
    var month = parseInt(dayItems[0]);
    var day = parseInt(dayItems[1]);
    var year = parseInt(dayItems[2]);
    if (year < 100)
        year += 2000;

    var h = 12;
    var m = 0;
    if (hourMin && hourMin.length >= 4) {
        var timeItems = hourMin.split(":");
        h = parseInt(timeItems[0]);
        if (h == 12)
            h = 0;
        m = parseInt(timeItems[1]);
    }

    if (amPm == 'PM' && h < 12)
        h += 12;
    var d = new Date(year, month - 1, day, h, m, 0);
    return d;
}
function stringVal(str) {
    if (!str)
        return '';
    return str.toString();
}
function dateStampFromHtml5Time(dayStr, timeStr) {
    var now = new Date();
    var hours = Math.floor(now.getTimezoneOffset() / 60);
    var sign = (hours >= 0) ? '-' : '+';
    return dayStr + 'T' + timeStr + ':00' + sign + pad(hours) + ':00';
}
function oracleDateStampFromDate(date) {
    var dayStr = dateComponentFromDateStamp(date);
    var timeStr = dateComponentFromDateStamp(date, true);
    return dateStampFromHtml5Time(dayStr, timeStr);
}
function pacificTimeOfDate(d = null) {
    if (!d)
        d = new Date();
    var year = d.getUTCFullYear();
    var month = d.getUTCMonth();
    var day = d.getUTCDate();
    var hours = d.getUTCHours();
    var minutes = d.getUTCMinutes();
    var seconds = d.getUTCSeconds();
    var utcDate = new Date(year, month, day, hours, minutes, seconds);
    utcDate.setMinutes(utcDate.getMinutes() - 420);
    return utcDate
}
function dateComponentFromDateStamp(dateStamp, timeFlg = false, localFormatFlg = false) {
    //"2019-05-08T15:00:49-07:00"
    var dateSt = new Date();
    if (dateStamp)
        dateSt = new Date(dateStamp);

    if (typeof dateSt.getMonth === 'function') {
        if (localFormatFlg) {
            if (timeFlg)
                return dateSt.toLocaleDateString() + ' ' + dateSt.toLocaleTimeString();
            else
                return dateSt.toLocaleDateString();
        }

        var year = dateSt.getFullYear();
        var month = pad(dateSt.getMonth() + 1);
        var day = pad(dateSt.getDate());

        var hour = pad(dateSt.getHours());
        var min = pad(dateSt.getMinutes());
        var seconds = pad(dateSt.getSeconds());

        if (timeFlg)
            return hour + ':' + min; //'00:00'
        else
            return year + '-' + month + '-' + day; //'2019-06-15'

    } else {
        console.log('invalid date!!!', dateStamp);
    }
    return dateStamp;
}
function dateStringFromDate(date) {
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}
