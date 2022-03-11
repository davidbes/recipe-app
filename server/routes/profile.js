const router = require('express').Router();
const authorize = require('../middleware/authorize');
const User = require('../models/user.model');
const Recipe = require('../models/Recipe.model');

router.get('/me', authorize, async (req, res) => {
	try {
		const { userId } = req;

		if (!userId) {
			return res.status(401).json({
				on: 'general',
				message: 'User not found!',
			});
		}
		const user = await User.findById(userId);

		if (!user) {
			return res.status(401).json({
				on: 'general',
				message: 'Profile not found.',
			});
		}

		res.json({
			user: {
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				image: user.image,
			},
			preferences: {
				langauge: user.langauge,
			},
		});
	} catch (error) {
		console.log('/my profile ERROR', error.message);
		res.status(500).json('Server error');
	}
});

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

		const retData = {
			id: user.id,
			name: `${user.firstName} ${user.lastName}`,
			image: user.image,
		};

		res.json(retData);
	} catch (error) {
		console.log('/register ERROR', error);
		res.status(500).json('Server error');
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
