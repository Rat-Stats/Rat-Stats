const mongodb = require('../models/mongoModels');
const sql = require('../models/sqlModels');
const User = require('../models/userModels');
const bcrypt = require('bcrypt');
const userController = {};

//createUser - create and save a new User into the database.
userController.createUser = async (req, res, next) => {
	console.log(req.body);
	try {
		const { username, password } = req.body;

		if (!username || !password) {
			throw new Error('Please provide a username and password');
		}

		const user = await User.create({ username, password });

		res.locals.user = user;

		return next();
	} catch (err) {
		return next('createUser Error :', err.message);
	}
};

//Verify User
userController.verifyUser = async (req, res, next) => {
	console.log(req.body);
	try {
		const { username, password } = req.body;

		if (!username || !password) {
			throw new Error('Please provide a username and password');
		}

		const user = await User.findOne({ username });
		console.log('user:', user);
		if (!user) {
			res.send('user not found!'); //need to comfirm with frontend
			return;
		}

		const passwordMatch = await bcrypt.compare(password, user.password);
		console.log(passwordMatch);

		if (!passwordMatch) {
			res.send('password not match');
			return;
		}
		res.locals.user = user;
		return next();
	} catch (err) {
		return next(err.message);
	}
};

module.exports = userController;
