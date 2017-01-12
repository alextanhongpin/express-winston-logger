// app/middlewares/passport.js

const TwitterStrategy = require('passport-twitter').Strategy;
const TwitterConfig = require('../config').twitter;
const User = require('../models/user');


module.exports = function (passport) {
	console.log('passport-facebook:TwitterStrategy')
	passport.use(new TwitterStrategy({
		consumerKey: TwitterConfig.consumerKey,
		consumerSecret: TwitterConfig.consumerSecret,
		callbackURL: TwitterConfig.callbackURL,
  		passReqToCallback: true
	}, function (req, token, refreshToken, profile, done) {

		console.log('twitter:profile', profile)
		process.nextTick(function () {

			if (!req.user) {
				const twitterUser = User.findOne({'twitter.id': profile.id});

				twitterUser.then(function (user) {
					if (user) {
						// user found, return them
						return done(null, user);
					} else {
						// new user, create an account
						var newUser = new User();

						newUser.twitter.id = profile.id;
						newUser.twitter.token = token;
						newUser.twitter.email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : '';
			

						newUser.displayName = profile.displayName;
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

				user.twitter.id = profile.id;
				user.twitter.token = token;
				user.twitter.email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : '';
	
				user.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, user);
                });
			}
			
		});
	}));

	
}
