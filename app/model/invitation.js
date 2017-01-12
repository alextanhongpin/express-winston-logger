const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt-nodejs');


const InvitationSchema = new Schema({
	invited_by: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User' 
	},
	token: { 
		type: String, 
		required: true 
	},
	date_created: { 
		type: Date, 
		expires: 1000 * 60 * 60 * 3 
	}, // 1 day = 24 hrs
	email: { 
		type: String,
		required: true
	},
	role: {
		type: String,
		default: 'Admin'
	}
});



module.exports = mongoose.model('Invitation', InvitationSchema);