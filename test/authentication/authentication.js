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
function login(model, cb) {
	chai.request(server)
	.post('/api/v1/authentication/login')
	.set('content-type', 'application/x-www-form-urlencoded')
	.send(model)
	.end((err, res) => {
		cb(res)
	});
}
describe('/POST authentication/login ', () => {
	
	before((done) => {
		mongoose.connect(uri, done);
	});

	after(() => {
		mongoose.disconnect()
	});

	// Background:
	it ('should response with error if user does not exist', (done) => {
		login({
			email: 'newuser.doe@mail',
			password: 123456
		}, (res) => {
			res.should.have.status(401);
			res.body.should.be.an('object');
			res.body.should.have.property('success')
			res.body.should.have.property('error_message');
			res.body.success.should.eql(false);
			done();
		});
	});

	it ('should response with access and refresh token if user exist', (done) => {
		login({
			email: 'john.doe@mail.com',
			password: 123456
		}, (res) => {
			res.should.have.status(200);
			res.body.should.be.an('object');
			res.body.should.have.property('id')
			res.body.should.have.property('access_token')
			res.body.should.have.property('refresh_token')
			res.body.should.have.property('success')
			res.body.success.should.eql(true);
			done();
		});
	});
});
