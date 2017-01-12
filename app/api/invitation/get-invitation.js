/* 
 * app/api/invitation/get-one.js
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Created by Alex Tan Hong Pin 18/10/2016
 * Copyright (c) 2016 alextanhongpin. All rights reserved.
**/

const Invitation = require('../../model/invitation');

function parseRequest(req, res) {

	// if (!id) {
	// 	return null;
	// }
	return {
		invitationId: req.params.id,
	}
}
function queryDB(request) {
	return Invitation.findOne({
		_id: request.invitationId
	});
}

function getInvitationService(req, res) {
	console.log('Getone')
	const request = parseRequest(req, res);

	const query = queryDB(request);
	const response = query.then((invitation) => {
		if (invitation) {
			
			res.status(200).json({
				success: true,
				results: invitation
			});

		} else {
			res.status(400).json({
				success: false,
				message: 'invitation not found'
			})
		}
	});
}


module.exports = {
	service: getInvitationService
}