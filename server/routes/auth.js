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
			res.status(401).json({
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

		// Generate token
		const token = jwtGenerator(savedUser.id);

		res.json({
			id: savedUser.id,
			token: token,
		});
	} catch (error) {
		console.log('auth/register ERROR', error);
		res.status(500).json('Server error');
	}
});

router.post('/login', validateLogin, async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email: email });

		if (!user) {
			res.status(401).json({ on: 'email', message: 'User does not exist!' });
		}

		const passwordMatch = bcrypt.compare(password, user.password);

		if (!passwordMatch) {
			res.status(401).json({ on: 'password', message: 'Inccorect password!' });
		}

		const token = jwtGenerator(user.id);

		res.json({
			id: user.id,
			token: token,
		});
	} catch (error) {
		console.log('auth/login ERROR', error);
		res.status(500).json('Server error');
	}
});

router.delete('/deleteUser', authorize, async (req, res) => {
	try {
		await User.findByIdAndDelete(req.user.trim());

		res.json({ message: 'User successfully deleted' });
	} catch (error) {
		console.log('auth/deleteUser ERROR', error);
		res.status(500).json('Server error');
	}
});

router.get('/user', authorize, async (req, res) => {
	try {
		res.json({
			id: req.user,
		});
	} catch (error) {
		console.log('auth/user ERROR', error);
		res.status(500).json('Server error');
	}
});

module.exports = router;
