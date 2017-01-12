// app/middlewares/passport.js

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GoogleConfig = require('../config').google;
const User = require('../models/user');


module.exports = function (passport) {
	console.log('passport-facebook:GoogleStrategy')
	passport.use(new GoogleStrategy({
		clientID: GoogleConfig.clientID,
		clientSecret: GoogleConfig.clientSecret,
		callbackURL: GoogleConfig.callbackURL,
  		passReqToCallback: true
	}, function (req, token, refreshToken, profile, done) {

		process.nextTick(function () {

			if (!req.user) {
				const googleUser = User.findOne({'google.id': profile.id});

				googleUser.then(function (user) {

					if (user) {
						// user found, return them
						return done(null, user);
					} else {
						// new user, create an account
						var newUser = new User();

						newUser.google.id = profile.id;
						newUser.google.token = token;
						newUser.google.email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : '';
						newUser.gender = profile.gender;

						newUser.displayName = profile.displayName;
						newUser.firstName =profile.name.givenName;
						newUser.lastName = profile.name.familyName;
						newUser.photoURL = profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null;


						newUser.save().then(function () {
							return done(null, newUser);
						}).catch(function (err) {
							return done(err, null);
						});
					}
				}).catch(function (err) {
					return done(err);
				});
			} else {


								// user already exists and is logged in, we have to link accounts
				var user = req.user;
				console.log(user, 'link google')
				user.google.id = profile.id;
				user.google.token = token;
				user.google.email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : '';
				user.gender = profile.gender;
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
