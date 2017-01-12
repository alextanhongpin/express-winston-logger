/* 
 * app/middlewares/passport-serializer.js
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Created by Alex Tan Hong Pin 29/5/2016
 * Copyright (c) 2016 alextanhongpin. All rights reserved.
**/


// the passport's serialize method won't be call if the session is set to false
// create your own custom serializer
const User = require('../model/user');

function deserializer(req, res, next) {
	if (req.user && req.user.id) {
		req.user = {
			id: req.user.id,
			refreshToken: req.user.token.refresh_token
		}
		return next();
	} else {
		return next('User does not exist.')
	}
}

module.exports = deserializer;