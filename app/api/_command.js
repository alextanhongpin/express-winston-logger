
/* 
 * app/api/authentication/command.js
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Created by Alex Tan Hong Pin 2/6/2016
 * Copyright (c) 2016 alextanhongpin. All rights reserved.
**/

"use strict";

const UserStore = require('../../stores/users');
const AuthStore = require('./store');

const deserializer = require('../../middlewares/passport-deserializer');
const jwt = require('../../middlewares/json-web-token');
const xhr_error = require('../../middlewares/errors').xhr_error;


function validateRefreshToken(req, res, next) {
	const refreshToken = req.query.refresh_token || req.body.refresh_token;
	console.log('validateRefreshToken', refreshToken)
	const _id = req.user && req.user.id;

	console.log('validateRefreshToken', refreshToken, _id)
	const model = {
	//	_id: _id,
		refreshToken, refreshToken
	}

	UserStore
	.validateRefreshToken(model)
	.then((data) => {
		console.log('validateRefreshToken:success:data', data)
		if (data) {
			// store the user id as reference
			req.user = {
				id: data.id
			}
			return next();
		} else {
			return next(Error('Error:Invalid refresh token'));
		}
	})
	.catch((err) => {
		console.log('validateRefreshToken:success:err', err)

		if (err) {
			return next(err);
		}
	});
}

function generateAccessToken(req, res) {

	res.status(200).json({
		access_token: jwt.generateAccessToken(req.user.id)
	});
}

// Wrong, you don't keep creating new refresh token
// only create it once during signup
// return both access/refresh tokens
function generateTokens(req, res, next) {
	const _id = req.user.id;
	const refreshToken = req.user.refreshToken;

	const access_token = jwt.generateAccessToken(_id);

	// user does not have a refresh token yet (just signed up);
	// create refresh token
	if (!refreshToken) {
		const newRefreshToken = jwt.generateRefreshToken(_id);
		UserStore.storeRefreshToken({
			_id: _id,
			refreshToken: newRefreshToken
		}).then((data) => {
			res.status(200).json({
				access_token: access_token,
				refresh_token: newRefreshToken
			})
		});
	} else {
		res.status(200).json({
			access_token: access_token,
			refresh_token: refreshToken
		});
	}
}



// NOTE: Cannot unlink all accounts, must have at least one valid account
function localAuthUnlink(req, res) {
	AuthStore.unlinkLocal(req, res).then(() => {
		res.status(200).json({
			success: 'true', 
			text: 'You have successfully unlinked your local account'
		});
	});
}

function facebookAuthUnlink(req, res) {
	AuthStore.unlinkFacebook(req, res).then(() => {
		res.status(200).json({
			success: 'true', 
			text: 'You have successfully unlinked your Facebook account'
		});		
	});
}

function googleAuthUnlink(req, res) {
	AuthStore.unlinkGoogle(req, res).then(() => {
		res.status(200).json({
			success: 'true', 
			text: 'You have successfully unlinked your Google account'
		});				
	});
}

function twitterAuthUnlink(req, res) {
	AuthStore.unlinkTwitter(req, res).then(() => {
		res.status(200).json({
			success: 'true', 
			text: 'You have successfully unlinked your Twitter account'
		});			
	});
}


const validateAccount = (req, res) => {

	res.status(200).json({
		meta: {
			success: true,
			validated: req.user && req.user.id ? true : false
		}
	});	
}

module.exports = function (passport) {


	function auth(auth_type, provider) {
		console.log(auth_type, provider)
		return [
			passport[auth_type](provider, { 
				//failureFlash: true,
				failWithError: true,
				session: false
			}),
			deserializer, 
			generateTokens,
			xhr_error
		]
	}




	return {
		localAuth: auth('authenticate', 'local-login'),
		localSignup: auth('authenticate', 'local-signup'),
		localAuthUnlink,

		facebookAuth: passport.authenticate('facebook', { session: false }),
		facebookAuthCallback: auth('authenticate', 'facebook'),
		facebookAuthConnect: passport.authorize('facebook', { session: false }),
		facebookAuthConnectCallback: auth('authorize', 'facebook'),
		facebookAuthUnlink,

		googleAuth: passport.authorize('google', { scope: ['https://www.googleapis.com/auth/plus.login'], session: false }),
		googleAuthCallback: auth('authenticate', 'google'),
		googleAuthUnlink,
		googleAuthConnect: passport.authorize('google', { scope: ['https://www.googleapis.com/auth/plus.login'], session: false }),
		googleAuthConnectCallback: auth('authorize', 'google'),

		twitterAuth: passport.authenticate('twitter', { session: false }),
		twitterAuthCallback: auth('authenticate', 'twitter'),
		twitterAuthConnect: passport.authorize('twitter', { session: false }),
		twitterAuthConnectCallback: auth('authorize', 'twitter'),
		twitterAuthUnlink,
		requestAccessToken: [validateRefreshToken, generateAccessToken],
		validateAccount
	}
}
