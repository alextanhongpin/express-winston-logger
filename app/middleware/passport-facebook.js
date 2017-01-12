// app/middlewares/passport.js

const FacebookStrategy = require('passport-facebook').Strategy;
const FacebookConfig = require('../config/config.js').facebook;
const User = require('../model/user.js');


module.exports = function (passport) {

	passport.use(new FacebookStrategy({
		clientID: FacebookConfig.appID,
		clientSecret: FacebookConfig.appSecret,
		callbackURL: FacebookConfig.callbackURL,
  		profileFields: ['id', 'displayName', 'photos', 'email'],
  		enableProof: true,
  		passReqToCallback: true,
  		session: false
	}, function (req, token, refreshToken, profile, done) {

		process.nextTick(function () {
			// This way of checking is useless, it assumes the session is store
			if (!req.user) {
				console.log('no user',req.user)

				const facebookUser = User.findOne({'facebook.id': profile.id});

				facebookUser.then((user) => {
					console.log('facebookUser:query', user)
					if (user) {
						// user found, return them
						console.log('user found')

						return done(null, user);
					} else {
						// new user, create an account

						// check if email exists
						const emails = profile.emails.map((email) => {
							return email.value;
						});
						console.log(emails)
						const queryEmail = User.findOne({ email: { $in: emails } })
						queryEmail.then((data) => {
							if (data) {
								var user = req.user;
								user.facebook.id = profile.id;
								user.facebook.token = token;
								user.facebook.email = profile.emails[0].value;

								// update missing information
								user.gender = user.gender ? user.gender : profile.gender;
								user.save(function(err) {
				                    if (err)
				                        throw err;


				                    return done(null, user);
				                });
							} else {
								let user = new User();

								user.facebook.id = profile.id;
								user.facebook.token = token;
								user.facebook.email = profile.emails[0].value;


								user.gender = profile.gender;
								user.displayName = profile.displayName;
								user.firstName =profile.name.givenName;
								user.lastName = profile.name.familyName;
								user.photoURL = profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null;

								user.save(function(err) {
			                        if (err)
			                            throw err;
			                        // if successful, return the new user
			                        console.log('facebookUser:save', user)
									
			                        return done(null, user);
			                    });
							}
						}).catch((err) => {
							return done(err);
						});

						
					}
				}).catch((err) => {
					return done(err);
				});
			} else {
				// user already exists and is logged in, we have to link accounts
				var user = req.user;

				console.log('user')
				user.facebook.id = profile.id;
				user.facebook.token = token;
				user.facebook.email = profile.emails[0].value;

				// update missing information
				user.gender = user.gender ? user.gender : profile.gender;

				user.save(function(err) {
                    if (err)
                        throw err;


                    return done(null, user);
                });

			}
		});
	}));

	
}
