const { Schema, model } = require('mongoose');

const recipeSchema = new Schema({
	author: {
		id: String,
		image: String,
		fullName: String,
	},
	name: String,
	image: String,
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
	badges: [{ id: String, name: String, color: String }],
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
			category: {
				id: String,
				name: String,
			},
		},
	],
});

module.exports = Recipe = model('recipe', recipeSchema);
