const winston = require('winston');
const expressWinston = require('express-winston');
expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');

expressWinston.bodyBlacklist.push('password');

//expressWinston.requestWhitelist.splice(expressWinston.requestWhitelist.indexOf('headers'), 1);

const DailyRotateFile = require('winston-daily-rotate-file');
winston.emitErrs = true;

const fs = require('fs');
const env = process.env.NODE_ENV || 'development';
const logDir = 'log';

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const requestLogger = expressWinston.logger({
    transports: [
        new DailyRotateFile({
            //level: 'info',
            datePattern: 'yyyy-MM-dd.',
        filename: `${logDir}/requests.log`,
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            prepend: true,
            colorize: false
        }),
        new (winston.transports.Console)({
            level: 'debug',
            handleExceptions: true,
            json: true,
            colorize: true
        })
    ],
    msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    exitOnError: false,
    meta: true,
    // requestFilter: function (req, propName) { 
    //     return req[propName];
    // } 
});

const errorLogger = expressWinston.errorLogger({
    transports: [
        new DailyRotateFile({
            filename: `${logDir}/errors.log`,
            datePattern: 'yyyy-MM-dd.',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            prepend: true,
            colorize: false
        }),
        new (winston.transports.Console)({
            level: 'debug',
            handleExceptions: true,
            json: true,
            colorize: true
        })
    ],
    msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    exitOnError: false,
    meta: true,
});

module.exports = { error: errorLogger, request: requestLogger }
