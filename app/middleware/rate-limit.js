var RateLimit = require('express-rate-limit');
var RedisStore = require('rate-limit-redis');
var redis = require('redis');

var limiter = new RateLimit({
	store: new RedisStore({
		expiry: 60,
		//prefix: ,
		client: redis.createClient()
	}),
	max: 100,
	delayMs: 0
});

module.exports = limiter;