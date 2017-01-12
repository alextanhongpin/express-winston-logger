
const route = require('../config/config.js').route;
const secret = require('../config/config.js').secret;
const User = require('../model/user.js');

const ApiFactory = require('../helper/factory');
module.exports = (app, passport) => {

	app.get('/', (req, res) => {
		res.status(200).json({
			message: 'hello world',
			success: true
		});
	});

	app.use('/api', (req, res) => {
		const token = req.body.token || req.query.token || req.headers['x-access-token'];

		if (token) {
			jwt.verify(token, secret, (err, decoded) => {
				if (err) {
					return res.json({
						success: false,
						message: 'Failed to authenticate token.'
					});
				} else {
					req.decoded = decoded;
					next();
				}
			});
			} else {
			return res.status(403).send({
				success: false,
				message: 'No token provided'
			});
		}
	})


	app.get(route._authenticate, (req, res) => {
		User.find({}, (err, users) => {
			res.json(users);
		});
	});

	app.post(route._authenticate, (req, res) => {
		User.findOne({
			name: req.body.name
		}, (err, user) => {
			if (err) throw err;

			if (!user) {
		      res.json({ success: false, message: 'Authentication failed. User not found.' });
		    } else if (user) {

		      // check if password matches
		      if (user.password != req.body.password) {
		        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
		      } else {

		        // if user is found and password is right
		        // create a token
		        const token = jwt.sign(user, app.get('superSecret'), {
		          expiresInMinutes: 1440 // expires in 24 hours
		        });

		        // return the information including token as JSON
		        res.json({
		          success: true,
		          message: 'Enjoy your token!',
		          token: token
		        });
		      }   

		    }
		});
	});


	const command = `./command`;
	const action = `./action`;
	const api = ApiFactory.mergeActionsAndCommands(require(action), require(command)(passport));
	ApiFactory.initialize(app, api);
}

