const router = require('express').Router();
const Recipe = require('../models/Recipe.model');

router.get('/', async (req, res) => {
	try {
		const recipes = await Recipe.find({});
		res.json(recipes || []);
	} catch (error) {
		console.log('recipes/ ERROR', error);
		res.status(500).json({ message: 'Server error occured!' });
	}
});

router.get('/:id', async (req, res) => {});

router.get('/:id/rate', async (req, res) => {});

module.exports = router;
