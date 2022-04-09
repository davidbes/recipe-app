const { Schema, model } = require('mongoose');
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

const recipeSchema = new Schema({
	name: String,
	image: String,
	language: String,
	dateAdded: String,
	author: {
		id: String,
		image: String,
		name: String,
	},
	badges: [{ name: String, description: String, image: String }],
	process: [
		{
			name: String,
			instructions: [
				{
					index: Number,
					instruction: String,
					warning: String,
				},
			],
		},
	],
	ingredients: [
		{
			name: String,
			unit: String,
			amount: Number,
		},
	],
	averages: {
		time: Number,
		serves: Number,
		rating: Number,
		difficulty: Number,
	},
	feedback: [
		{
			user: String,
			rating: Number,
			serves: Number,
			prepTimes: [{ step: String, time: Number }],
			time: Number,
			difficulty: Number,
		},
	],
});

recipeSchema.plugin(mongoose_fuzzy_searching, {
	fields: ['name'],
});
module.exports = Recipe = model('recipe', recipeSchema);
