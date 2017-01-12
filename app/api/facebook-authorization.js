/* 
 * app/api/facebook-authorization.js
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Created by Alex Tan Hong Pin 8/10/2016
 * Copyright (c) 2016 alextanhongpin. All rights reserved.
**/

const deserializeUser = require('../middleware/passport-deserializer.js');
const generateTokens = require('../middleware/generate-token.js');
const xhr_error = require('../middleware/error-handler.js').xhr_error;
const routes = require('../config/config.js').routes;

module.exports = function (app, passport) {
	/*
	 * GET /api/v1/auth/facebook/connect
	**/
	app.get(routes.FACEBOOK_CONNECT, passport.authorize('facebook', { session: false }));

	/*
	 * GET /api/v1/auth/facebook/connect/callback
	**/
	app.get(routes.FACEBOOK_CONNECT_CALLBACK, passport.authorize('facebook', {
		failWithError: true,
		session: false
	}, deserializeUser, generateTokens))

}