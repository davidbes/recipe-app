const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// App setup
const app = express();

// Middleware for handling requests
app.use(express.json());
app.use(cors());

// App routers
app.use('/auth', require('./routes/auth'));
app.use('/recipes', require('./routes/recipes'));
app.use('/profile', require('./routes/profile'));

// Connect to the database.
mongoose.connect(
	process.env.MONGODB_CONNECTION_STRING,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err) => {
		if (err) throw err;
		console.log('MongoDB connection established');
	}
);

// Start the server on port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));
