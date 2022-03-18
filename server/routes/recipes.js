const router = require('express').Router();
const Recipe = require('../models/Recipe.model');

router.get('/', async (req, res) => {
	try {
		const recipes = await Recipe.find({});

		returnData = recipes.map((recipe) => {
			return {
				id: recipe.id,
				name: recipe.name,
				image: recipe.image,
				authorName: recipe.author.name,
				authorId: recipe.author.id,
				time: Math.round(recipe.averages.time),
				serves: recipe.averages.serves,
				difficulty: recipe.averages.difficulty,
				rating: recipe.averages.rating,
			};
		});

		res.json(returnData || []);
	} catch (error) {
		console.log('recipes/ ERROR', error);
		res.status(500).json({ message: 'Server error occured!' });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const recipe = await Recipe.findById(req.params.id);

		if (!recipe) {
			return res.status(404).json({ message: 'Recipe not found!' });
		}

		returnData = {
			id: recipe.id,
			name: recipe.name,
			image: recipe.image,
			authorName: recipe.author.name,
			authorId: recipe.author.id,
			badges: recipe.badges,
			time: Math.round(recipe.averages.time),
			serves: recipe.averages.serves,
			difficulty: recipe.averages.difficulty,
			rating: recipe.averages.rating,
		};

		res.json(returnData);
	} catch (error) {
		console.log('recipes/ ERROR', error);
		res.status(500).json({ message: 'Server error occured!' });
	}
});

router.get('/:id/rate', async (req, res) => {});

module.exports = router;
