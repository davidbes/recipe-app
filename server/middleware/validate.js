const validEmail = (userEmail) =>
	/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);

module.exports = {
	validateRegister: (req, res, next) => {
		const { email, firstName, lastName, password } = req.body;

		if (!(email && firstName && lastName && password)) {
			return res
				.status(401)
				.json({ on: 'general', message: 'Missing credentials' });
		} else if (!validEmail(email)) {
			return res
				.status(401)
				.json({ on: 'email', message: 'Email is invalid!' });
		} else {
			next();
		}
	},
	validateLogin: (req, res, next) => {
		const { email, password } = req.body;

		if (!(email && password)) {
			return res
				.status(401)
				.json({ on: 'general', message: 'Missing credentials' });
		} else if (!validEmail(email)) {
			return res
				.status(401)
				.json({ on: 'email', message: 'Email is invalid!' });
		} else {
			next();
		}
	},
};
