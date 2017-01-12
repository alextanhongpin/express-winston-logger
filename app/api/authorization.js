/* 
 * app/api/authorization.js
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Created by Alex Tan Hong Pin 8/10/2016
 * Copyright (c) 2016 alextanhongpin. All rights reserved.
**/


const routes = require('../config/config.js').routes;

const jwt = require('../middleware/json-web-token');
//const xhr_error = require('../middleware/error-handler.js').xhr_error;

module.exports = (app, passport) => {

	/*
 	 * /POST /api/v1/authentication/local/unlink
 	 * route for user to unlink account
	**/
	app.post(routes.AUTHORIZE, (req, res, next) => {
		jwt.authorize(req, res).then((successObject) => {
			res.status(200).json(successObject);
		}).catch((err) => {
			return next(err.message)
			//res.status(401).json(errorObject.message);
		});
	});
}