const fs = require('fs');

const recipesRaw = fs.readFileSync('mocks/recipes_from_api.json');
const recipesData = JSON.parse(recipesRaw);

const usersRaw = fs.readFileSync('generated/users.json');
const usersData = JSON.parse(usersRaw);

const generatedRecipes = recipesData.recipes.map((recipe) => {
	const user = usersData[Math.floor(Math.random() * usersData.length)];

	return {
		name: recipe.title,
		image: recipe.image,
		averages: {
			serves: recipe.servings,
			time: recipe.readyInMinutes,
			rating: Math.max(1, Math.floor(Math.random() * 11 * 100) / 100),
			difficulty: Math.max(1, Math.floor(Math.random() * 11 * 100) / 100),
		},
		feedbacks: [],
		dateAdded: new Date().toISOString(),
		author: {
			id: user['_id']['$oid'],
			image: user['image'],
			name: user['firstName'] + ' ' + user['lastName'],
		},
		instructions: [],
		ingredients: [],
		badges: [],
		language: 'EN',
	};
});

fs.writeFileSync(
	'generated/gen_recipes.json',
	JSON.stringify(generatedRecipes)
);
