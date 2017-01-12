/* 
 * app/middlewares/json-web-token.js
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Created by Alex Tan Hong Pin 6/10/2016
 * Copyright (c) 2016 alextanhongpin. All rights reserved.
**/

"use strict";

const jwt = require('jsonwebtoken');
const secret = require('../config/config.js').secret;
const jwtConfig = require('../config/config.js').jwt;
const crypto = require('crypto');
const User = require('../model/user');


/*
 * Generate a new access token with a predefined expiry date
**/
function generateAccessToken (user_id) {
	return jwt.sign({
		id: user_id
	}, secret, {
		expiresIn: jwtConfig.expiresIn,
		//expiresAt: Date.now() - (60 * 60 * 24 * 1000)
		// issuer: 'alextanhongpin',
		// admin: true,
		// audience
		// jwtid
		// subject
		// noTimestamp
		// header,
		// scopes: ["repo", "public_repo"]  // what capabilities this token has
		// scopes: {
		//     users: {
		//       actions: ['read', 'create']
		//     },
		//     users_app_metadata: {
		//       actions: ['read', 'create']
		//     }
		//   }
		role: 'user' // admin, user, public etc
		// You should define permissions for roles, not users. Users are assigned a role which specifies the type of access it has on a given page
	});
}

/*
 * Generate a new refresh token, no expiry date, but can be blacklisted
**/
function generateRefreshToken(user_id) {
	const refreshToken = `${ user_id.toString() }.${ crypto.randomBytes(40).toString('hex') }`;
	return refreshToken;
}

/*
 * Validate the access token and throw appropriate error
**/
function validateAccessToken(token) {
	
	return new Promise((resolve, reject) => {
		jwt.verify(token, secret, (err, user) => {
			if (err) {
				/*
			      err = {
			        name: 'JsonWebTokenError',
			        message: 'jwt malformed'
			      }
       				 message: 'jwt expired',
					'jwt malformed'
					'jwt signature is required'
					'invalid signature'
					'jwt audience invalid. expected: [OPTIONS AUDIENCE]'
					'jwt issuer invalid. expected: [OPTIONS ISSUER]'
					'jwt id invalid. expected: [OPTIONS JWT ID]'
					'jwt subject invalid. expected: [OPTIONS SUBJECT]'

			    */
				reject(err);
			} else {
				resolve(user.id);
			}
		});
	});
}

/*
 * Validate the refresh token and throw appropriate error
**/
function validateRefreshToken(req, res, next) {
	// User.findOne({
	// 	refresh_token: req.headers
	// })
	// db.findAndUpdate({token})
}

/*
 * Blacklist the refresh token
**/
function blacklistRefreshToken(req, res, next) {
	// db.findAndRemove({token})
}

function _extractTokens (req) {

	// e.g. req.headers -> 'Authorization ....your-token-here'
	const accessToken = req.body.access_token || req.query.access_token || _extractTokensFromHeaders(req);
	return accessToken;
}

function _extractTokensFromHeaders(req) {
	const hasAuthorizationHeaders = req.headers && req.headers.authorization;

	if (!hasAuthorizationHeaders) return false;

	const auth = req.headers.authorization.split(' ');
	const source = auth[0];
	const accessToken = auth[1];

	if (source !== 'Authorization') return false;
	if (!accessToken) return false;

	return accessToken;
}

function _extractRefreshToken(req) {

	const refreshToken = req.body.refresh_token || req.query.refresh_token;

	return refreshToken;
}
function authorize(req, res, next) {
	//console.log('/api/v1:req.headers', req.headers.authorization); 
	//console.log('/api/v1:req.headers:user-agent', req.headers['user-agent']); 
  	const accessToken = _extractTokens(req);

  	if (!accessToken) {
  		// Token does not exist

  		// Whitelist url?
		// if (/auth/i.test(url) || 
		// 	/tokens/i.test(url) || 
		// 	(/posts/i.test(url) && !/api\/v1/i.test(url))) {
		// 	console.log('contains whitelisted url')
		// 	return next();
		// }
  		return Promise.reject({
  			success: false,
  			message: 'You are not authorized to use this service'
  		})
  	} else {

  		return new Promise((resolve, reject) => {
  			validateAccessToken(accessToken)
	  		.then((id) => {
	  			resolve({
	  				id: id,
	  				success: true,
	  				message: 'authorization success'
	  			});
			}).catch((err) => {

				if (err) {
					const isExpired = err.name === 'TokenExpiredError';
					// possible error name = TokenExpiredError
					// JsonWebTokenError
					if (isExpired) {
						reject({
							success: false,
							message: 'token expired',
						});
					} else {
						reject({
							success: false,
							message: err.message,
						});
					}
				}
			});
  		});

	}
}

function refreshAccessToken(req, res) {
	const accessToken = _extractTokens(req);
	const refreshToken = _extractRefreshToken(req);
	const haveTokens = accessToken && refreshToken;
	
	if (haveTokens) {
  		return new Promise((resolve, reject) => {
  			validateAccessToken(accessToken)
	  		.then((id) => {
	  			resolve({
	  				id: id,
	  				success: true,
	  				message: 'authorization success'
	  			});
			}).catch((err) => {

				if (err) {
					const isExpired = err.name === 'TokenExpiredError';

					if (isExpired) {

						/*
						 * We are only interested in expired accessToken
						 * If they have a refresh token, then create a new one
						**/
						User.findOne({
							'token.refresh_token': refreshToken
						}).then((user) => {
							const newAccessToken = generateAccessToken(user.id);
							resolve({
								success: true,
								access_token: newAccessToken
							});
						}).catch((err) => {
							reject({
								success: false,
								message: err,
							});
						})
					} else {

						/*
						 * Other kind of errors
						**/
						reject({
							success: false,
							message: err.message,
						});
					}
				}
			});
  		});
	} else {
		return Promise.reject({
  			success: false,
  			message: 'You are not authorized to use this service'
  		})
	}
}



function storeRefreshToken(param) {
	const refreshToken = param.refreshToken;
	const _id = param._id;

	return User.findOneAndUpdate({ _id: _id }, {
		$set: {
			'token.refresh_token': refreshToken
		}
	}, {});
}


function includeTokenInResponse(req, res) {
	const user_id = req.user.id;
	const refreshToken = req.user.refreshToken;

	const accessToken = generateAccessToken(user_id);

	return new Promise((resolve, reject) => {
		if (!refreshToken) {
			const newRefreshToken = generateRefreshToken(user_id);
			return storeRefreshToken({
				_id: user_id,
				refreshToken: newRefreshToken
			}).then((data) => {
				resolve({
					id: user_id,
					access_token: accessToken,
					refresh_token: newRefreshToken,
					success: true
				});
			}).catch((err) => {
				reject(err);
			})
		} else {
			resolve({
				id: user_id,
				access_token: accessToken,
				refresh_token: newRefreshToken,
				success: true
			});
		}
	});
}

module.exports = {
	generateAccessToken,
	generateRefreshToken,
	validateToken: validateAccessToken,
	authorize,
	refreshAccessToken,
	includeTokenInResponse
	//validatePath
};