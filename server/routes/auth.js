const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwtGenerator = require('../util/jwtGenerator');
const authorize = require('../middleware/authorize');
const { validateRegister, validateLogin } = require('../middleware/validation');
const User = require('../models/user.model');

router.post('/register', validateRegister, async (req, res) => {
	try {
		const { firstName, lastName, email, password } = req.body;

		const userExists = await User.findOne({ email: email });

		if (userExists) {
			return res.status(401).json({
				on: 'email',
				message: 'User already exists!',
			});
		}

		// Password Encryption
		const salt = await bcrypt.genSalt(10);
		const bcryptPass = await bcrypt.hash(password, salt);

		const newUser = new User({
			email: email,
			password: bcryptPass,
			firstName: firstName,
			lastName: lastName,
		});

		const savedUser = await newUser.save();

		const token = jwtGenerator(savedUser.id);

		res.json({
			id: savedUser.id,
			token: token,
		});
	} catch (error) {
		console.log('auth/register ERROR', error);
		res.status(500).json({ message: 'Server error occured!' });
	}
});

router.post('/login', validateLogin, async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email: email });

		if (!user) {
			return res
				.status(401)
				.json({ on: 'email', message: 'User does not exist!' });
		}

		const passwordMatch = await bcrypt.compare(password, user.password);

		if (!passwordMatch) {
			return res
				.status(401)
				.json({ on: 'password', message: 'Inccorect password!' });
		}

		const token = jwtGenerator(user.id);

		return res.json({
			id: user.id,
			token: token,
		});
	} catch (error) {
		console.log('auth/login ERROR', error);
		return res.status(500).json({ message: 'Server error occured!' });
	}
});

router.delete('/deleteUser', authorize, async (req, res) => {
	try {
		await User.findByIdAndDelete(req.user.trim());

		return res.json({ message: 'User successfully deleted' });
	} catch (error) {
		console.log('auth/deleteUser ERROR', error);
		res.status(500).json({ message: 'Server error occured!' });
	}
});

router.get('/verify', authorize, async (req, res) => {
	try {
		const user = await User.findById(req.userId);

		if (!user) {
			return res.status(401).json({ message: 'User not found!' });
		}

		return res.json({
			id: req.userId,
			name: user.firstName + ' ' + user.lastName,
			image: user.image,
		});
	} catch (error) {
		console.log('auth/user ERROR', error);
		return res.status(500).json({ message: 'Server error occured!' });
	}
});

module.exports = router;
