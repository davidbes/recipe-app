const router = require('express').Router();
const bcrypt = require('bcrypt');
const { validateRegister, validateLogin } = require('../middleware/validation');
const User = require('../models/user.model');

router.get('/', async (req, res) => {});

router.get('/:id', async (req, res) => {});

router.get('/:id/rate', async (req, res) => {});

module.exports = router;
