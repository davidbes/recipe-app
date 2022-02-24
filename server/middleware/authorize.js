const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	try {
		const jwtToken = req.header('Authorization');

		if (!jwtToken)
			return res
				.status(401)
				.json({ on: 'auth', message: 'No token available' });

		const verified = jwt.verify(jwtToken, process.env.SECRET);

		if (!verified)
			return res.status(401).json({ on: 'auth', message: 'Token is invalid' });

		req.user = verified.user;
		next();
	} catch (error) {
		console.log('token auth ERROR', error);
		res.status(500).json('Server error');
	}
};
