/* 
 * app/db/mongo.js
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Created by Alex Tan Hong Pin 29/5/2016
 * Copyright (c) 2016 alextanhongpin. All rights reserved.
**/

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
	console.log('mongoose:connected to *:localhost/rents');
});

module.exports = mongoose;