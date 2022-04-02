const sharp = require('sharp');
const generateFilepath = require('../util/generateFilepath');

const processImage = async (req, res, next) => {
	if (!req.file) {
		return next();
	}

	const filepath = generateFilepath(req);
	const image = sharp(req.file.buffer);

	await image.toFile(`./public/${filepath}`);

	req.imageUrl = `images/${filepath}`;

	next();
};

module.exports = processImage;
