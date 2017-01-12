module.exports = {
	port: process.env.PORT || 3000,
	secret: 'somesupersecret',
	jwt: {
		expiresIn: '1min'
	},

	//baseAPIUrl: '/api/v1',
	routes: {
		REGISTER: '/api/v1/authentication/register',
		LOGIN: '/api/v1/authentication/login',
		LOCAL_UNLINK: '/api/v1/authentication/local/unlink',
		AUTHORIZE: '/api/v1/authorization',
		REFRESH: '/api/v1/refresh_tokens',

		FACEBOOK: '/api/v1/authentication/facebook',
		FACEBOOK_CALLBACK: '/api/v1/auth/facebook/callback',
		FACEBOOK_UNLINK: '/api/v1/authentication/facebook/unlink',
		FACEBOOK_CONNECT: '/api/v1/authentication/facebook/connect',
		FACEBOOK_CONNECT_CALLBACK: '/api/v1/authentication/facebook/connect/callback',
		USERS: '/api/v1/users',
		LOGS: '/api/v1/logs',
		LOG: '/api/v1/logs/:logname',

		INVITATION: '/api/v1/invitations/:id',
		INVITATIONS: '/api/v1/invitations',
	},

	mongoose_db: 'mongodb://localhost/auth_api',
	google: {
		apiKey: 'AIzaSyBte_BBgdTXxSa4QcqUPmB9UuZ7_jNvlWg',
		clientID: '257035124162-gp8d4ceov574rsbk0c4t0m7lusev22er.apps.googleusercontent.com',
		clientSecret: 'AUIHGQ3LMlATmb0qF1-3PfcZ',
		callbackURL: 'http://localhost:3000/api/v1/auth/google/callback'
	},

	facebook: { // for facebook client sdk
		appID: "266184197067068",  //"1572318442991105",
		appSecret: "b1dc80e70584a58e3e7b1202a603a0cb", // "0c188b4add127a7aca3f55c64d9b5f48", //
		callbackURL: 'http://localhost:3000/api/v1/auth/facebook/callback'
	},

    twitter: {
        consumerKey       : 'gEIc308qdEll82zMFP64SY5Qa',
        consumerSecret    : 'zLoTuz75jCecyZHJFmdxwW94x17pP5Cn1wVp0HCsjGJ55Zp1i1',
        callbackURL       : 'http://localhost:3000/auth/twitter/callback'
    },
}