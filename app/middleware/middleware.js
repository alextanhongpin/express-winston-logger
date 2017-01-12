
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('../config/config.js');
const mongooseHelper = require('../database/mongoose.js');
const uri = config.mongoose_db; //mongoose_uri[env];
const cors = require('cors')
const morgan      = require('morgan');
const logger = require('./logger.js');

const passport = require('passport');
const setupApi = require('../api/setup.js');
const errorHandler = require('./error-handler');
const limiter = require('./rate-limit');

//const morganConfig = require('./morgan-config');

var whitelist = ['http://localhost:4000', 'http://localhost:3000'];
var corsOptions = {
  origin: function(origin, callback){
  	console.log(origin)
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(originIsWhitelisted ? null : 'Bad Request', originIsWhitelisted);
  }
};

module.exports = app => {


	mongooseHelper.connect(uri);
	app.use(morgan('dev'));
	app.use(bodyParser.json({
		limit: '1gb'
	}));

	app.use(limiter);

	//app.use(cors(corsOptions)); // issue detecting own origin
	app.use(bodyParser.urlencoded({
		limit: '1gb',
		extended: false
	}));
	app.use(cookieParser());

	app.use(passport.initialize());
	

	//logger.debug("Overriding 'Express' logger");
	//app.use(morgan('combined', { "stream": logger.stream }));

	//app.use(morganConfig({stream: logger.stream}))
	//app.use(morgan('{"remote_addr": ":remote-addr", "remote_user": ":remote-user", "date": ":date[clf]", "method": ":method", "url": ":url", "http_version": ":http-version", "status": ":status", "result_length": ":res[content-length]", "referrer": ":referrer", "user_agent": ":user-agent", "response_time": ":response-time"}', {stream: logger.stream}));
	
	//app.use(logger.request)
	require('./passport-local')(passport);
	require('./passport-facebook')(passport);
	//require('./passport-google')(passport);
	//require('./passport-twitter')(passport);

	setupApi(app, passport);
	//app.use(logger.error)
	console.log((app.get('env') === 'development'))
	if (app.get('env') === 'development') {
		app.use(errorHandler.development_error_handler);
	} else {
		app.use(errorHandler.production_error_handler);
	}
}


/*
Number of visits and number of unique visitors
Visit duration and last visits
Authenticated users, and last authenticated visits
Days of week and rush hours
Domains/countries of host's visitors.
Hosts list
Number of page views
Most viewed, entry, and exit pages
File types
OS used
Browsers used
Robots used
HTTP referrer
Search engines, key phrases and keywords used to find the analyzed web site
HTTP errors
Some of the log analyzers also report on who is on the site, conversion tracking, visit time and page navigation.

*/