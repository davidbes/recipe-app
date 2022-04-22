const router = require('express').Router();
const authorize = require('../middleware/authorize');
const processImage = require('../middleware/processImage');
const uploadImage = require('../middleware/uploadImage');
const protect = require('../middleware/protect');
const Badge = require('../models/Badge.model');

router.get('/', async (req, res) => {
	try {
		const { query } = req;

		const badges = await Badge.fuzzySearch({
			query: query.search,
			prefixOnly: true,
			minSize: 4,
		});

		res.json(badges);
	} catch (error) {
		console.log('recipes/ ERROR', error);
		res.status(500).json({ message: 'Server error occured!' });
	}
});

router.post(
	'/',
	authorize,
	protect,
	uploadImage,
	processImage,
	async (req, res) => {
		try {
			const { name, description } = req.body;
			const badgeExists = await Badge.findOne({ name: name });

			if (badgeExists) {
				return res.status(401).json({
					message: 'Badge already in database!',
				});
			}

			const newBadge = new Badge({
				name: name,
				description: description,
				image: req.imageUrl,
			});

			const savedBadge = await newBadge.save();

			res.json(savedBadge);
		} catch (error) {
			console.log('recipes/ ERROR', error);
			res.status(500).json({ message: 'Server error occured!' });
		}
	}
);

module.exports = router;
