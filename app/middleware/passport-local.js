/* 
 * app/middleware/passport-local.js
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Created by Alex Tan Hong Pin 5/10/2016
 * Copyright (c) 2016 alextanhongpin. All rights reserved.
**/


const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/user');

const validator = require('./validator');

module.exports = (passport) => {

	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	/*
     * Define LocalStrategy for register
	**/
	passport.use('register', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true,
		session: false
	}, register));


	/*
     * Define LocalStrategy for login
	**/
	passport.use('login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true,
		session: false
	}, login));



	function register(req, email, password, done) {

		const firstName = req.body.first_name && req.body.first_name.trim().length;
		const lastName = req.body.last_name && req.body.last_name.trim().length;

		const isValidEmail = validator.isValidEmail(email);

		if (!isValidEmail || !password) {
			return done('please enter a valid credential');
		} else if (!firstName) {
			return done('please enter a valid first name');
		} else if (!lastName) {
			return done('please enter a valid last name');
		}

		process.nextTick(() => {

			const getUser = User.findOne({ 'local.email': email })

			getUser.then((user) => {
			
				if (user) {
					return done('another user have been registered with the same email');
				} else {
					const user = new User();
					user.local.email = email;
					user.local.password = user.generateHash(password);
					user.country = req.body.country;
					user.display_name = req.body.display_name || email.split('@')[0];
					user.first_name = req.body.first_name || email.split('@')[0];
					user.last_name = req.body.last_name;

					User.create(user, (err, model) => {
						if (err) {
							throw err;
						}
						return done(null, user);
					});
				}
			});

			getUser.catch((err) => {
				if (err) {
					return done(err);
				}
			});

		});
	}

	

	function login(req, email, password, done) {

		const getUser = User.findOne({'local.email': email});

		getUser.then((user) => {
			if (!user) {
				return done("user does not exist");
			} 
			if (!user.validatePassword(password)) {
				return done("invalid credentials");
			}
			return done(null, user);
		});

		getUser.catch((err) => {
			return done(err);
		});
	}
}
