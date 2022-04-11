const router = require('express').Router();
const authorize = require('../middleware/authorize');
const processImage = require('../middleware/processImage');
const uploadImage = require('../middleware/uploadImage');
const protect = require('../middleware/protect');
const Ingredient = require('../models/Ingredient.model');

router.get('/', async (req, res) => {
	try {
		const { query } = req;

		const ingredients = await Ingredient.fuzzySearch({
			query: query.search,
			prefixOnly: true,
			minSize: 4,
		});

		res.json(ingredients);
	} catch (error) {
		console.log('recipes/ ERROR', error);
		res.status(500).json({ message: 'Server error occured!' });
	}
});

router.post('/', authorize, protect, async (req, res) => {
	try {
		const { name } = req.body;

		console.log(name);
		const ingredientExists = await Ingredient.findOne({ name: name });

		if (ingredientExists) {
			return res.status(401).json({
				message: 'Ingredient already in database!',
			});
		}

		const newIngredient = new Ingredient({
			name: name,
		});

		const savedIngredient = await newIngredient.save();

		res.json(savedIngredient);
	} catch (error) {
		console.log('recipes/ ERROR', error);
		res.status(500).json({ message: 'Server error occured!' });
	}
});

module.exports = router;
