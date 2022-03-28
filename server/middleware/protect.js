require('dotenv').config();

module.exports = (req, res, next) => {
	try {
		if (req.userId !== process.env.ADMIN)
			return res.status(403).json({ message: 'Forbidden' });
		next();
	} catch (error) {
		console.log('protect ERROR: \n \t', error.message);
		res.status(500).json(error.message);
	}
};
