/* 
 * app/pages/authentication/action.js
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Created by Alex Tan Hong Pin 28/5/2016
 * Copyright (c) 2016 alextanhongpin. All rights reserved.
**/

'use strict';

// routes
const SIGNUP = '/api/v1/auth/signup';
const LOCAL = '/api/v1/auth/local';
const LOCAL_UNLINK = '/api/v1/auth/local/unlink';

const FACEBOOK = '/api/v1/auth/facebook';
const FACEBOOK_CALLBACK = '/api/v1/auth/facebook/callback';
const FACEBOOK_UNLINK = '/api/v1/auth/facebook/unlink';
const FACEBOOK_CONNECT = '/api/v1/auth/facebook/connect';
const FACEBOOK_CONNECT_CALLBACK = '/api/v1/auth/facebook/connect/callback';

const GOOGLE = '/api/v1/auth/google';
const GOOGLE_UNLINK = '/api/v1/auth/google/unlink';
const GOOGLE_CALLBACK = '/api/v1/auth/google/callback';
const GOOGLE_CONNECT = '/api/v1/auth/google/connect';
const GOOGLE_CONNECT_CALLBACK = '/api/v1/auth/google/connect/callback';


const TWITTER = '/api/v1/auth/twitter';
const TWITTER_CALLBACK = '/api/v1/auth/twitter/callback';
const TWITTER_CONNECT = '/api/v1/auth/twitter/connect';
const TWITTER_CONNECT_CALLBACK = '/api/v1/auth/twitter/connect/callback';
const TWITTER_UNLINK = '/api/v1/auth/twitter/unlink';

const REFRESH_TOKEN = '/api/v1/tokens';
const VALIDATE_ACCOUNT = '/api/v1/auth/validate';


const LocalSignup = {
	method: 'post',
	route: SIGNUP,
	dispatch: 'localSignup'
}

const LocalAuth = {
	method: 'post',
	route: LOCAL,
	dispatch: 'localAuth'
}
const LocalAuthUnlink = {
	method: 'get',
	route: LOCAL_UNLINK,
	dispatch: 'localAuthUnlink'
}

const FacebookAuth = {
	method: 'get',
	route: FACEBOOK,
	dispatch: 'facebookAuth'
}


const FacebookAuthCallback = {
	method: 'get',
	route: FACEBOOK_CALLBACK,
	dispatch: 'facebookAuthCallback'
}

const FacebookAuthConnect = {
	method: 'get',
	route: FACEBOOK_CONNECT,
	dispatch: 'facebookAuthConnect'
}

const FacebookAuthConnectCallback = {
	method: 'get',
	route: FACEBOOK_CONNECT_CALLBACK,
	dispatch: 'facebookAuthConnectCallback'
}

const FacebookAuthUnlink = {
	method: 'get',
	route: FACEBOOK_UNLINK,
	dispatch: 'facebookAuthUnlink'
}

const GoogleAuth = {
	method: 'get',
	route: GOOGLE,
	dispatch: 'googleAuth'
}

const GoogleAuthCallback = {
	method: 'get',
	route: GOOGLE_CALLBACK,
	dispatch: 'googleAuthCallback'
}
const GoogleAuthConnect = {
	method: 'get',
	route: GOOGLE_CONNECT,
	dispatch: 'googleAuthConnect'
}
const GoogleAuthUnlink = {
	method: 'get',
	route: GOOGLE_UNLINK,
	dispatch: 'googleAuthUnlink'
}

const GoogleAuthConnectCallback = {
	method: 'get',
	route: GOOGLE_CONNECT_CALLBACK,
	dispatch: 'googleAuthConnectCallback'
}


const TwitterAuth = {
	method: 'get',
	route: TWITTER,
	dispatch: 'twitterAuth'
}

const TwitterAuthCallback = {
	method: 'get',
	route: TWITTER_CALLBACK,
	dispatch: 'twitterAuthCallback'
}
const TwitterAuthConnect = {
	method: 'get',
	route: TWITTER_CONNECT,
	dispatch: 'twitterAuthConnect'
}
const TwitterAuthUnlink = {
	method: 'get',
	route: TWITTER_UNLINK,
	dispatch: 'twitterAuthUnlink'
}

const TwitterAuthConnectCallback = {
	method: 'get',
	route: TWITTER_CONNECT_CALLBACK,
	dispatch: 'twitterAuthConnectCallback'
}

const RequestAccessToken = {
	method: 'post',
	route: REFRESH_TOKEN,
	dispatch: 'requestAccessToken'
}

const ValidateAccount = {
	method: 'get',
	route: VALIDATE_ACCOUNT,
	dispatch: 'validateAccount'
}


module.exports = [
	LocalSignup,
	LocalAuth,
	LocalAuthUnlink,

	FacebookAuth,
	FacebookAuthCallback,
	FacebookAuthConnect,
	FacebookAuthConnectCallback,
	FacebookAuthUnlink,

	GoogleAuth,
	GoogleAuthCallback,
	GoogleAuthConnect,
	GoogleAuthConnectCallback,
	GoogleAuthUnlink,

	TwitterAuth,
	TwitterAuthCallback,
	TwitterAuthConnect,
	TwitterAuthConnectCallback,
	TwitterAuthUnlink,

	RequestAccessToken,
	ValidateAccount
]


