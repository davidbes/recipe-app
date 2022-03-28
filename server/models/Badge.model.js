const { Schema, model } = require('mongoose');
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

const badgeSchema = new Schema({
	name: String,
	description: String,
	image: String,
});

badgeSchema.plugin(mongoose_fuzzy_searching, {
	fields: ['name'],
});

module.exports = Badge = model('badge', badgeSchema);
