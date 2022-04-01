const { Schema, model } = require('mongoose');
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

const recipeSchema = new Schema({
	author: {
		id: String,
		image: String,
		name: String,
	},
	name: String,
	image: String,
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
			prepTimeSum: Number,
			difficulty: Number,
		},
	],
	badges: [{ name: String, description: String }],
	language: String,
	cookingSteps: [
		{
			id: String,
			stepNumber: Number,
			level: Number,
			instruction: String,
			warning: String,
		},
	],
	ingredients: [
		{
			id: String,
			name: String,
			unit: String,
			amount: Number,
		},
	],
});

recipeSchema.plugin(mongoose_fuzzy_searching, {
	fields: ['name'],
});
module.exports = Recipe = model('recipe', recipeSchema);
