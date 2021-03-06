const { Schema, model } = require('mongoose');

const userSchema = new Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, requrired: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	image: String,
	saved: [{ type: String }],
	description: String,
	language: String,
	currentlyInProcess: String,
});

module.exports = User = model('user', userSchema);
