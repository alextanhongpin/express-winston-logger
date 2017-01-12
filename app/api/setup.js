/* 
 * app/api/setup.js
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Created by Alex Tan Hong Pin 8/10/2016
 * Copyright (c) 2016 alextanhongpin. All rights reserved.
**/

const emailAuthenticationRoute = require('./local-authentication');
const facebookAuthenticationRoute = require('./facebook-authentication');
const authorizationRoute = require('./authorization');
const reauthenticationRoute = require('./reauthentication');
const usersRoute = require('./users');
const logsRoute = require('./logs');
const invitationRoute = require('./invitation')

module.exports = (app, passport) => {

	emailAuthenticationRoute(app, passport);
	facebookAuthenticationRoute(app, passport);
	authorizationRoute(app, passport);
	reauthenticationRoute(app, passport);
	usersRoute(app, passport);

	logsRoute(app, passport);
	invitationRoute(app, passport);
}