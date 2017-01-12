/* 
 * app/api/email-authentication.js
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Created by Alex Tan Hong Pin 18/10/2016
 * Copyright (c) 2016 alextanhongpin. All rights reserved.
**/


const routes = require('../config/config.js').routes;

const cancelInvitationService = require('./invitation/cancel-invitation').service;
const getInvitationService = require('./invitation/get-invitation').service;
const getInvitationsService = require('./invitation/get-invitations').service;
const sendInvitationService = require('./invitation/send-invitation').service;

module.exports = (app, _) => {
	console.log(routes.INVITATIONS)
	/*
	 * /GET /api/v1/invitations: 
	 * route for user to login an existing account
	**/
	app.get(routes.INVITATIONS, function(req, res) {
		console.log('at invitaition routes')
		getInvitationsService(req, res)
	});

	/*
	 * /POST /api/v1/authentication/register
	 * route for user to register an account
	**/
	app.get(routes.INVITATION, getInvitationService);

	/*
 	 * /POST /api/v1/invitations
 	 * route for creating new invitation
	**/
	app.post(routes.INVITATIONS, sendInvitationService);

	/*
 	 * /DELETE /api/v1/invitations/:id
 	 * route for creating new invitation
	**/
	app.delete(routes.INVITATION, cancelInvitationService);
}



