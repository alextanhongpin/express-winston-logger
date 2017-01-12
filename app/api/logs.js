/* 
 * app/api/logs.js
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Created by Alex Tan Hong Pin 8/10/2016
 * Copyright (c) 2016 alextanhongpin. All rights reserved.
**/

const fs = require('fs');
const path = require('path');
const appDir = path.dirname(require.main.filename);
const routes = require('../config/config.js').routes;
const User = require('../model/user');

module.exports = (app, passport) => {

	/*
 	 * /GET /api/v1/logs
 	 * get a list of log filenames from the log directory
	**/
	console.log('at route logs')
	app.get('/api/v1', function(req, res) {
		console.log('asdoi v1')
		res.status(200).json({
			message: 'Welcome to the best api route'
		})
	})
	app.get(routes.LOGS, (req, res) => {
		console.log('routes.logs')
		// TODO: blacklist other urls from accessing this without permissions
		// carry out pagination for users
		let fileNames = []
		fs.readdir(appDir + '/log', function(err, files) {

		    if (err) return;
		    files.forEach(function(f) {
		        fileNames.push(f)
		    });

			res.status(200).json(fileNames)
		});
	});

	/*
 	 * /GET /api/v1/logs/:logname
 	 * get the content of a log by the name in JSON format
	**/
	// app.get(routes.LOG, (req, res) => {
	// 	const logname = req.params.logname;
	// 	fs.readFile(`${ appDir }/log/${ logname }`, 'utf8', function (err,data) {
	// 	  if (err) {
	// 	    return console.log(err);
	// 	  }

	// 	  let output = null;
	// 	  // "newline-delimited JSON" or "ndjson";
	// 	  try {
	// 			output = data.split('\n').map((line) => {
	// 				if (isJSON(line)) {
	// 					return JSON.parse(line);
	// 				} else {
	// 					return line;
	// 				}
	// 			});
	// 			console.log('outputping', output)
	// 			console.log('outputing')
	// 			res.status(200).json(output)
	// 			return
	// 		} catch(e) {
	// 			res.status(401).json({
	// 				success: false,
	// 				message: e
	// 			})
	// 		}
	// 	});
	// 	// 
	// });


	function isJSON(str) {
		try {
		    JSON.parse(str);
		} catch (e) {
		    return false;
		}
		return true;
	}
}
