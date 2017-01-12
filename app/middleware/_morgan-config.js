'use strict';

var morgan = require('morgan');
var os = require('os');

morgan.token('conversation-id', function getConversationId(req) {
    return req.conversationId;
});
morgan.token('session-id', function getSessionId(req) {
    return req.sessionId;
});
morgan.token('instance-id', function getInstanceId(req) {
    return req.instanceId;
});
morgan.token('hostname', function getHostname() {
    return os.hostname();
});
morgan.token('pid', function getPid() {
    return process.pid;
});

morgan.token('req-xhr', function getRequestXHR(req) {
	return req.xhr;
});

morgan.token('req-body', function getRequestBody(req) {
	return req.body;
});
morgan.token('req-query', function getRequestQuery(req) {
	return req.query;
});
morgan.token('req-params', function getRequestParams(req) {
	return req.params;
});
morgan.token('req-cookies', function getRequestCookies(req) {
	return req.cookies;
});

/* doesn't work, need to intercept the body response */
// morgan.token('res-body', function getResponseBody(req, res) {
// 	console.log(res.body)
// 	return res.body;
// })


module.exports = function loggingMiddleware(obj) {
    return morgan(jsonFormat, obj);
};

function jsonFormat(tokens, req, res) {
    return JSON.stringify({
        'remote_address': tokens['remote-addr'](req, res),
        'time': tokens['date'](req, res, 'iso'),
        'method': tokens['method'](req, res),
        'url': tokens['url'](req, res),
        'http_version': tokens['http-version'](req, res),
        'status_code': tokens['status'](req, res),
        'content_length': tokens['res'](req, res, 'content-length'),
        'referrer': tokens['referrer'](req, res),
        'user_agent': tokens['user-agent'](req, res),
        'response_time': tokens['response-time'](req, res),
        'conversation_id': tokens['conversation-id'](req, res),
        'session_id': tokens['session-id'](req, res),
        'hostname': tokens['hostname'](req, res),
        'instance': tokens['instance-id'](req, res),
        'pid': tokens['pid'](req, res),
        'req_xhr': tokens['req-xhr'](req, res),
        'req_body': tokens['req-body'](req, res),
        'req_query': tokens['req-query'](req, res),
        'req_params': tokens['req-params'](req, res),
        'req_cookies': tokens['req-cookies'](req, res),
        //'res_body': tokens['res-body'](req, res),
    });
}