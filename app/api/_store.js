/* 
 * app/stores/auths.js
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Created by Alex Tan Hong Pin 3/6/2016
 * Copyright (c) 2016 alextanhongpin. All rights reserved.
**/



function unlinkLocal(req, res) {
	let user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;

    return user.save((err) => {
    	if (err) {
    		console.log(error);
    	}
    });
}

function unlinkFacebook(req, res) {
    let user            = req.user;
    user.facebook.token = undefined;

    return user.save((err) => {
    	if (err) {
    		console.log(error);
    	}
    });
}

function unlinkTwitter(req, res) {
   let user           = req.user;
   user.twitter.token = undefined;

    return user.save((err) => {
    	if (err) {
    		console.log(error);
    	}
    });
}

function unlinkGoogle(req, res) {
 	console.log("unlinkGoogle")
 	let user = req.user;
    user.google.token = undefined;

	return user.save((err) => {
		if (err) {
			console.log(error);
		}
	});
}

module.exports = {
	unlinkLocal,
	unlinkFacebook,
	unlinkTwitter,
	unlinkGoogle
}