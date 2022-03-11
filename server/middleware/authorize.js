const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	try {
		const jwtToken = req.header('Authorization');
		if (!jwtToken)
			return res
				.status(401)
				.json({ on: 'auth', message: 'No token available' });
		try {
			const verified = jwt.verify(jwtToken, process.env.SECRET);
			req.userId = verified.user;
			next();
		} catch (error) {
			return res.status(401).json({ on: 'auth', message: 'Token is invalid' });
		}
	} catch (error) {
		console.log('token auth ERROR: \n \t', error.message);
		res.status(500).json(error.message);
	}
};
