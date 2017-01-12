/* 
 * app/api/invitation/delete-one.js
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Created by Alex Tan Hong Pin 18/10/2016
 * Copyright (c) 2016 alextanhongpin. All rights reserved.
**/

const shortid = require('shortid');
const Invitation = require('../../model/invitation');

function parseRequest(req, res) {

	const invitationId = req.params.id;
	const { user_id, email } = req.body;

	if (!user_id || !email || !invitationId) return null;
	return {
		invited_by: user_id,
		email: email,
		_id: invitationId
	}
}

function queryDB(request) {
	return Invitation.findOneAndRemove(parsedRequest);
}

function cancelInvitationService(req, res) {
	const request = parseRequest(req, res);
	if (!request) {
		res.status(401).json({
			success: false,
			message: 'Bad request'
		});
	}

	const query = queryDB(request);
	query.then((data) => {
		res.status(204).json({
			success: true,
			message: 'Invitation cancelled'
		});
	});
}

module.exports = {
	service: cancelInvitationService
}