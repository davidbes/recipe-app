const router = require('express').Router();
const authorize = require('../middleware/authorize');
const User = require('../models/User.model');
const Recipe = require('../models/Recipe.model');
const uploadImage = require('../middleware/uploadImage');
const processImage = require('../middleware/processImage');

// Edit profile
router.put('/', authorize, uploadImage, processImage, async (req, res) => {
	try {
		const { description, firstName, lastName, title, imageUrl } = req.body;
		const image = req.imageUrl || imageUrl;
		const userId = req.userId;

		const user = await User.findByIdAndUpdate(userId, {
			firstName: firstName,
			lastName: lastName,
			description: description,
			image: image,
			title: title,
		});

		res.status(200).json(user);
	} catch (error) {
		console.log('/register ERROR', error);
		res.status(500).json('Server error');
	}
});

// Get profile
router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;

		if (!id) {
			res.status(400).json({
				on: 'general',
				message: 'Bad request',
			});
		}
		const user = await User.findById(id);

		if (!user) {
			return res.status(401).json({
				on: 'general',
				message: 'Profile not found.',
			});
		}

		res.json({
			id: user.id,
			name: `${user.firstName} ${user.lastName}`,
			image: user.image,
			description: user.description,
			language: user.language,
			title: user.title,
		});
	} catch (error) {
		console.log('/register ERROR', error);
		res.status(500).json('Server error');
	}
});

router.put('/save', authorize, async (req, res) => {
	try {
		const recipe = req.query.recipe || '';

		const exists = await Recipe.findById(req.query.recipe);

		if (!exists) {
			return res.status(403).json({ message: 'Recipe does not exist!' });
		}

		const user = await User.findByIdAndUpdate(req.userId, {
			$addToSet: { saved: recipe },
		});

		res.status(200).json(user);
	} catch (error) {
		console.log('recipes/ ERROR', error);
		res.status(500).json({ message: 'Server error occured!' });
	}
});

router.get('/:id/saved', async (req, res) => {
	try {
		const user = await User.findById(req.params.id);

		if (!user) {
			return res.status(404).json({ message: 'User not found!' });
		}

		const recipes = await Recipe.find({ _id: { $in: user.saved } });

		res.json(
			recipes.map((recipe) => {
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
			})
		);
	} catch (error) {
		console.log('recipes/ ERROR', error);
		res.status(500).json({ message: 'Server error occured!' });
	}
});

router.get('/:id/uploaded', async (req, res) => {
	try {
		const id = req.params.id;

		if (!id) {
			return res.status(404).json({ message: 'ID needed!' });
		}

		const recipes = await Recipe.find({
			'author.id': id,
		});

		res.json(
			recipes.map((recipe) => {
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
			})
		);
	} catch (error) {
		console.log('recipes/ ERROR', error);
		res.status(500).json({ message: 'Server error occured!' });
	}
});

module.exports = router;
