/*
 * /GET User
**/




const mocha = require('mocha');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const should = chai.should();
const mongoose = require('mongoose');
const User = require('../../app/model/user');
const server = require('../../server');
const config = require('../../app/config/config.js');
const uri = config.mongoose_db; //mongoose_uri[env];

chai.use(chaiHTTP)

// Feature
/*
 * api/v1/auth/register
 */
// function login(model, cb) {
// 	chai.request(server)
// 	.post('/api/v1/auth/login')
// 	.set('content-type', 'application/x-www-form-urlencoded')
// 	.send(model)
// 	.end((err, res) => {
// 		cb(res)
// 	});
// }
describe('/GET users ', () => {
	
	before((done) => {
		mongoose.connect(uri, done);
	});

	after(() => {
		mongoose.disconnect()
	});

	// Background:
	
	it ('should get a list of users')
	it ('should be sortable by date, device, location, verified')
	it ('should get active users')
	it ('should get real time users')
	it ('should get user location country')
	it ('should get dashboard')
	it ('should get unregistered users')
	it ('should only allow authorized users to view data')
	it ('should not show blocked users')
	// it ('should response with access and refresh token if user exist', (done) => {
	// 	login({
	// 		email: 'john.doe@mail.com',
	// 		password: 123456
	// 	}, (res) => {
	// 		res.should.have.status(200);
	// 		res.body.should.be.an('object');
	// 		res.body.should.have.property('id')
	// 		res.body.should.have.property('access_token')
	// 		res.body.should.have.property('refresh_token')
	// 		res.body.should.have.property('success')
	// 		res.body.success.should.eql(true);
	// 		done();
	// 	});
	// });
});
