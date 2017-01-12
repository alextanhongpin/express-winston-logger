const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
mongoose.Promise = global.Promise;


const UserSchema = new Schema({
	version: {type: String, default: '0.0.1' },

	token: {
		access_token: String,
		refresh_token: String
	},

	local: {
		email: String,
		password: String,
	},
	facebook: {
		id: String,
		token: String,
		email: String,
		//name: String
	},
	twitter: {
		id: String,
		token: String,
		//displayName: String,
		//username: String
	},
	google: {
		id: String,
		token: String,
		email: String,
		//name: String
	},
	location: {
		address_line_1: String,
		address_line_2: String,
		city: String,
		state: String,
		postal_code: String,
		country: String,
		address_full: String,
		iso_code: String,
		latitude: Number,
		longitude: Number
	},

	photo: String,
	cover_photo: String,
	phone: String,
	email: String,
	fax: String,
	rating: Number,
	gender: String,
	verified: {type: Boolean, default: false },

	// Version 0.0.1
	display_name: String,
	first_name: String,
	last_name: String,
	date_created: {type: Date, default: Date.now },
	date_modified: {type: Date, default: Date.now },
	// Version 0.0.2
	tagline: String,

	// Version 0.0.3
	fingerprint: String, // for tracking unique views
	
	// Version 0.0.4
	role: { type: String, default: 'user' },
	invited_by:  { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User' 
	},
	invited: { type: Boolean, default: false },

}, {
	toObject: {
		virtuals: true
	},
	toJSON: {
		virtuals: true
	} 
});


// UserSchema.virtual('full_name').get(function () {
//     return [this.first_name, this.last_name].join(' ');
// });
UserSchema.methods.generateHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

UserSchema.methods.validatePassword = function (password) {
	return bcrypt.compareSync(password, this.local.password);
}


module.exports = mongoose.model('User', UserSchema);