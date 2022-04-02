const router = require('express').Router();
const authorize = require('../middleware/authorize');
const uploadImage = require('../middleware/uploadImage');
const processImage = require('../middleware/processImage');
const Recipe = require('../models/Recipe.model');
const User = require('../models/User.model');

const generateDBQuery = require('../util/generateDBQuery');

router.get('/', async (req, res) => {
	try {
		const { query } = req;

		if (!query.sort || !query.order) {
			query.sort = 'dateAdded';
			query.order = 'descending';
		}

		// Check if query includes search, then call the method for fuzzy search or just apply normal filters.
		const generatedQuery = generateDBQuery(query);

		console.log('Recipe query:', JSON.stringify(generatedQuery, null, 4));

		const recipes = query.search
			? await Recipe.fuzzySearch(
					{ query: query.search, prefixOnly: true, minSize: 4 },
					generatedQuery
			  ).sort({
					[query.sort]: query.order,
			  })
			: await Recipe.find(generatedQuery).sort({
					[query.sort]: query.order,
			  });

		const returnData = recipes.map((recipe) => {
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

// router.get('/update', async (req, res) => {
// 	const recipes = await Recipe.find({});
// 	for (let x in recipes) {
// 		const updated = await Recipe.findByIdAndUpdate(recipes[x].id, recipes[x]);
// 		console.log(updated);
// 	}
// 	res.status(200).json('Done');
// });

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
			author: recipe.author,
			badges: recipe.badges,
			time: recipe.averages.time,
			serves: recipe.averages.serves,
			difficulty: recipe.averages.difficulty,
			rating: recipe.averages.rating,
			instructions: recipe.instructions,
			instructionSections: recipe.instructionSections,
			ingredients: recipe.ingredients,
			badges: recipe.badges,
		};

		res.json(returnData);
	} catch (error) {
		console.log('recipes/ ERROR', error);
		res.status(500).json({ message: 'Server error occured!' });
	}
});

router.post('/:id/rate', authorize, async (req, res) => {
	try {
		const recipeId = req.params.id;

		const recipe = await Recipe.findById(recipeId);

		if (!recipe) {
			return res.status(404).json({ message: "Recipe doesn't exist!" });
		}

		// get all feedbacks
		// generate new averages
		// all the feedback in the feedbacks array
	} catch (error) {}
});

router.post('/', authorize, uploadImage, processImage, async (req, res) => {
	try {
		const {
			imageUrl,
			userId,
			body: {
				name,
				instructions,
				ingredients,
				badges,
				serves,
				duration,
				difficulty,
				instructionSections,
			},
		} = req;

		console.log(req.body);

		const author = await User.findById(userId).select(
			'firstName lastName id image'
		);

		const authorObj = {
			id: author.id,
			name: author.firstName + ' ' + author.lastName,
			image: author.image,
		};
		const dateAdded = new Date().toISOString();

		const newRecipe = new Recipe({
			author: authorObj,
			name: name,
			image: imageUrl,
			averages: {
				time: duration,
				serves: serves,
				difficulty: difficulty,
				rating: 10,
			},
			dateAdded: dateAdded,
			feedback: [],
			badges: badges || [],
			instructionSection: instructionSections || [],
			instructions: instructions || [],
			ingredients: ingredients || [],
			language: 'EN',
		});

		const addedRecipe = await newRecipe.save();

		res.json(addedRecipe);
	} catch (error) {}
});

module.exports = router;
