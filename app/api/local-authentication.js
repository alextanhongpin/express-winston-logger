/* 
 * app/api/email-authentication.js
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Created by Alex Tan Hong Pin 8/10/2016
 * Copyright (c) 2016 alextanhongpin. All rights reserved.
**/


const deserialize = require('../middleware/passport-deserializer.js');
const jwt = require('../middleware/json-web-token');
//const xhr_error = require('../middleware/error-handler.js').xhr_error;
const routes = require('../config/config.js').routes;

module.exports = (app, passport) => {


	/*
	 * /POST /api/v1/authentication/login: 
	 * route for user to login an existing account
	**/
	app.post(routes.LOGIN, passport.authenticate('login', { 
		failWithError: true,
	}), deserialize, (req, res) => {
		jwt.includeTokenInResponse(req, res).then(data => {
			res.status(200).json(data);
		});
	});


	/*
	 * /POST /api/v1/authentication/register
	 * route for user to register an account
	**/
	app.post(routes.REGISTER, passport.authenticate('register', {
		failWithError: true
	}), deserialize, (req, res) => {
		jwt.includeTokenInResponse(req, res).then(data => {
			res.status(200).json(data);
		});
	});
	/*
 	 * /POST /api/v1/authentication/local/unlink
 	 * route for user to unlink account
	**/
	// app.post(routes.LOCAL_UNLINK, (req, res) => {
		
	// 	let user = req.user;
	//     user.local.email = undefined;
	//     user.local.password = undefined;

	//     const saveUser = user.save((err) => {
	//     	if (err) {
	//     		return next(err);
	//     	}
	//     });

	//     saveUser.then(() => {
	// 		res.status(200).json({
	// 			success: true, 
	// 			message: 'local account have been unlinked'
	// 		});
	// 	});
	// });
}



