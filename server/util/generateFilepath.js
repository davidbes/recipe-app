const uuid = require('uuid');

const generateFilepath = (req) => {
	switch (req.baseUrl.split('/').pop()) {
		case 'recipes':
			return `recipes/${uuid.v4()}.jpg`;
		case 'profile':
			return `users/${req.userId}.jpg`;
		default:
			break;
	}
	return undefined;
};

module.exports = generateFilepath;
