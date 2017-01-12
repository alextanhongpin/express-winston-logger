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
	console.log('getInvitationsServicesparseRequest')
	return {
		limit: parseInt(req.query.limit, 10) || 8,
		offset: parseInt(req.query.offset, 10) || 0
	}
}
function queryDB(request) {
	return Invitation.find()
	.skip(request.limit * request.offset)
	.limit(request.limit)
}

function parseResponse() {
// include pagination?
}
function getInvitationsService(req, res) {
	console.log('getInvitationsServices')

	const request = parseRequest(req, res);
	const query = queryDB(request);
	query.then((data) => {
		res.status(200).json({
			success: true,
			results: data
		});
	});

}

module.exports = {

	service: getInvitationsService
}