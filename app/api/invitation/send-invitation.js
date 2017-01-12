/* 
 * app/api/invitation/get-one.js
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

	const { user_id, email, role } = req.body;
	if (!user_id || !email || !role) {
		return null;
	}
	return {
		invited_by: user_id,
		token: shortid.generate(),
		email: email,
		role: role,
	}
}
function queryDB(request) {
	return Invitation.findOne({
		invited_by: request.invited_by,
		email: request.email
	});
}

function sendInvitationService(req, res) {
	const request = parseRequest(req, res);
	if (!request) {
		res.status(401).json({
			success: false,
			message: 'Bad request'
		});
	}
	const query = queryDB(request);
	const response = query.then((user) => {
		if (user) {
			
			return error({
				success: false,
				message: 'User already have invitation'
			}, res, 403);

		} else {

			const invitation = new Invitation(request);
			return invitation.save()
			.then((data) => {
				// Add rabbit mq here to send email with token
				// data.token
				return success({
					success: true,
					message: 'Invitation sent'
				}, res)
			});

		}
	});
}


function success(json, res) {
	res.status(200).json(json);
}
function error(json, res, status_code=403) {
	res.status(status_code).json(json);
}

module.exports = {
	service: sendInvitationService
}