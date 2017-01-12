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
function register(model, cb) {
	chai.request(server)
	.post('/api/v1/authentication/register')
	.send(model)
	.end((err, res) => {
		cb(res)
	});
}
describe('/POST authentication/register ', () => {
	
	before((done) => {
		mongoose.connect(uri, done);
	});

	after(() => {
		mongoose.disconnect()
	})
	// Background:
	describe('New user register a new account', () => {

		it ('should create a new account', (done) => {

			register({
				first_name: 'undergo',
				last_name: 'doe',
				email: 'undergo.doe@mail.com',
				password: 123456
			}, (res) => {
				User.remove({ _id: res.body.id }, () => {
					res.should.have.status(200);
					res.body.should.be.an('object');
					res.body.should.have.property('success');
					res.body.success.should.eql(true);
					res.body.should.have.property('access_token');
					res.body.should.have.property('refresh_token');
					res.body.should.have.property('id');
					done();
				});
			});
		});

		it ('should response with error if email is taken', (done) => {
			register({
				first_name: 'john',
				last_name: 'doe',
				email: 'john.doe@mail.com',
				password: 123456
			}, (res) => {
				res.should.have.status(401);
				res.body.should.be.an('object');
				res.body.should.have.property('success');
				res.body.should.have.property('error_message');
				res.body.success.should.eql(false);
				done();
			});
		});

		it ('should response with error if first_name or last_name does not exist', (done) => {
			register({
				first_name: '',
				last_name: '',
				email: 'john.doe@mail.com',
				password: 123456
			}, (res) => {
				res.should.have.status(401);
				res.body.should.be.an('object');
				res.body.should.have.property('success');
				res.body.should.have.property('error_message');
				res.body.success.should.eql(false);
				done();
			});
		});

		it ('should response with error if password is invalid', (done) => {
			register({
				first_name: 'john',
				last_name: 'doe',
				email: 'john.doe@mail.com',
			}, (res) => {
				res.should.have.status(401);
				res.body.should.be.an('object');
				res.body.should.have.property('success');
				res.body.should.have.property('error_message');
				res.body.success.should.eql(false);
				done();
			});
		});

		it ('should response with error if email is invalid', (done) => {
			register({
				first_name: 'john',
				last_name: 'doe',
				email: 'john.doe@mail',
				password: 123456
			}, (res) => {
				res.should.have.status(401);
				res.body.should.be.an('object');
				res.body.should.have.property('success');
				res.body.should.have.property('error_message');
				res.body.success.should.eql(false);
				done();
			});
		});
	});



	it ('should allow user to login using email and password')
	it ('should allow user to login using mobile number')
	it ('should allow user to login using facebook')
	it ('should allow user to login using twitter')
	it ('should allow user to login using googleplus')
	it ('should allow user to login using instagram')
	it ('shold allow user to login using...')

});