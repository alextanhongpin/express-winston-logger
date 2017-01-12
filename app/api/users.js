/* 
 * app/api/users.js
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Created by Alex Tan Hong Pin 18/10/2016
 * Copyright (c) 2016 alextanhongpin. All rights reserved.
**/


const routes = require('../config/config.js').routes;
const User = require('../model/user');

module.exports = (app, passport) => {

	/*
 	 * /POST /api/v1/authentication/local/unlink
 	 * route for user to unlink account
	**/
	app.get(routes.USERS, (req, res) => {
		// TODO: blacklist other urls from accessing this without permissions
		// carry out pagination for users
		User.find({}).then((data) => {
			const output = whitelist([
				'id', 
				'first_name', 
				'last_name',
				'display_name',
				'date_modified',
				'date_created',
				'verified',
				'local.email',
			], data)
			console.log(output)
			res.status(200).json(output)
		}).catch((err) => {
			res.status(403).json({
				success: false,
				message: err
			});
		});
	});

	// assign role
	// create role
	// create permission
	// attach permission
}
function whitelist(arr, data) {
	
	return data.map((model) => {
		let schema = {}
		arr.forEach((key) => {
			schema[key] = model[key];
		});
		console.log('schema', schema)
		return schema;
	});
}