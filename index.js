'use strict';

exports.__esModule = true;
exports.wait = wait;
exports.repeat = repeat;
exports.until = until;
exports.frame = frame;
exports.clear = clear;
/**
 * steamer-timer
 * github: https://github.com/SteamerTeam/steamer-timer
 * npm: https://www.npmjs.com/package/steamer-timer
 * version: 0.1.0
 * date: 2016.08.02
 */

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function () {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function () {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };

    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
        clearTimeout(id);
    };
})();

var timeOut = window.setTimeout,
    timeInterval = window.setInterval,
    clrTimeOut = window.clearTimeout,
    clrInterval = window.clearInterval,
    requestFrame = window.requestAnimationFrame,
    clrFrame = window.cancelAnimationFrame;

function parseTime(time) {
    if (typeof time === 'number') {
        return time;
    }

    var ms = 0;
    // borrow from https://github.com/ChiperSoft/Timed
    var match = time.toLowerCase().replace(/[^a-z0-9\.]/g, "").match(/(?:(\d+(?:\.\d+)?)(?:days?|d))?(?:(\d+(?:\.\d+)?)(?:hours?|hrs?|h))?(?:(\d+(?:\.\d+)?)(?:minutes?|mins?|m\b))?(?:(\d+(?:\.\d+)?)(?:seconds?|secs?|s))?(?:(\d+(?:\.\d+)?)(?:milliseconds?|ms))?/);

    if (match[0]) {
        ms = parseFloat(match[1] || 0) * 86400000 + //days
        parseFloat(match[2] || 0) * 3600000 + //hours
        parseFloat(match[3] || 0) * 60000 + //minutes
        parseFloat(match[4] || 0) * 1000 + //seconds
        parseInt(match[5] || 0, 10); //milliseconds
    } else {
        throw "Could not parse time argument, please check your syntax";
    }

    return ms;
}

function parseDate(date) {
    var match = date.match(/(\d{4})(?:\-)(\d{2})(?:\-)(\d{2})(?:\s+)(\d{2})(?:\:)(\d{2})(?:\:)(\d{2})/);
    // console.log(match, match.length);
    if (match) {
        var year = parseInt(match[1], 10),
            month = parseInt(match[2], 10),
            day = parseInt(match[3], 10),
            hour = parseInt(match[4], 10),
            min = parseInt(match[5], 10),
            sec = parseInt(match[6], 10);

        var expectedDate = new Date(year, month - 1, day, hour, min, sec),
            expectedMs = expectedDate.getTime(),
            currentMs = Date.now(),
            diffMs = expectedMs - currentMs;
        return diffMs > 0 ? diffMs : 0;
    } else {
        throw "Could not parse time argument, please check your syntax. xxxx-xx-xx xx:xx:xx";
    }
}

/**
 * setTimeout
 * @param  {Function} callback [callback function]
 * @param  {String|Int}   time [wait time "1d 2h 3m 5s 100ms" | 100]
 * @return {Int}               [id]
 */
function wait(callback, time) {
    var ms = parseTime(time),
        timerId = timeOut(callback, ms);
    return timerId;
}

/**
 * setInterval
 * @param  {Function} callback [callback function]
 * @param  {String|Int}   time [repeat time "1d 2h 3m 5s 100ms" | 100]
 * @return {Int}               [id]
 */
function repeat(callback, time) {
    var ms = parseTime(time),
        timerId = timeInterval(callback, ms);
    return timerId;
}

/**
 * setTimeout until some date
 * @param  {Function} callback [callback function]
 * @param  {String}   date     [date xxxx-xx-xx xx:xx:xx]
 * @return {Int}               [id]
 */
function until(callback, date) {
    var ms = parseDate(date),
        timerId = timeOut(callback, ms);
    return timerId;
}

/**
 * requestAnimationFrame
 * @param  {Function} callback [callback function]
 * @return {Int}               [id]
 */
function frame(callback) {
    var timerId = requestFrame(callback);
    return timerId;
}

/**
 * clear timeout|timeinterval|frame
 * @param  {Integer} timerId [id]
 */
function clear(timerId) {
    clrTimeOut(timerId);
    clrInterval(timerId);
    clrFrame(timerId);
    timerId = null;
}

exports.default = {
    wait: wait,
    repeat: repeat,
    until: until,
    frame: frame,
    clear: clear
};