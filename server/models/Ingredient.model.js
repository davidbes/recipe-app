const { Schema, model } = require('mongoose');
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

const ingredientSchema = new Schema({
	name: String,
});

ingredientSchema.plugin(mongoose_fuzzy_searching, {
	fields: ['name'],
});

module.exports = Ingredient = model('ingredient', ingredientSchema);
