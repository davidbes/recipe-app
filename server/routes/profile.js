const router = require('express').Router();
const authorize = require('../middleware/authorize');
const User = require('../models/user.model');

router.get('/', authorize, async (req, res) => {
	try {
		const { user } = req.body;

		if (!user) {
			res.status(401).json({
				on: 'general',
				message: 'User not found!',
			});
		}
		const userExists = await User.findById({ user });

		if (!userExists) {
			res.status(401).json({
				on: 'general',
				message: 'Profile not found.',
			});
		}

		res.json(userExists);
	} catch (error) {
		console.log('/register ERROR', error);
		res.status(500).json('Server error');
	}
});

module.exports = router;
