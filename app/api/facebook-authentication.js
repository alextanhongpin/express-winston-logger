/* 
 * app/api/facebook-authentication.js
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Created by Alex Tan Hong Pin 8/10/2016
 * Copyright (c) 2016 alextanhongpin. All rights reserved.
**/

const deserializeUser = require('../middleware/passport-deserializer.js');
const generateTokens = require('../middleware/generate-token.js');
//const xhr_error = require('../middleware/error-handler.js').xhr_error;
const routes = require('../config/config.js').routes;

module.exports = function (app, passport) {
	/*
	 * GET /api/v1/auth/facebook
	**/
	app.get(routes.FACEBOOK, passport.authenticate('facebook', { session: false }))

	/*
	 * GET /api/v1/auth/facebook/callback
	**/
	app.get(routes.FACEBOOK_CALLBACK, (req, res, next) => {
		passport.authenticate('facebook', {
			failWithError: true,
			session: false
		})(req, res, next);
	}, deserializeUser, generateTokens)

	/*
	 * GET /api/v1/auth/facebook/unlink
	**/
	app.get(routes.FACEBOOK_UNLINK, (req, res) => {
		let user            = req.user;
	    user.facebook.token = undefined;

	    user.save((err) => {
	    	if (err) {
	    		next(err)
	    	}
	    }).then(() => {
	    	res.status(200).json({
				success: 'true', 
				text: 'You have successfully unlinked your Facebook account'
			});	
	    });
	});


}
