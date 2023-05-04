const db = require('../../server/models/sqlModels.js');
const sqlController = {};

sqlController.addNewRat = (req, res, next) => {
	const text = `INSERT INTO public.rat (latitude, longitude, time) VALUES($1, $2, $3)`;

	const values = [req.body.location.lat, req.body.location.lng, 'NOW()'];

	// console.log(req.body.location);

	db.query(text, values)
		.then((data) => {
			// console.log('data: ', data.rows);
			res.locals.newRat = data.rows;
			return next();
		})
		.catch((err) => {
			console.log(err);
			return next(err);
		});
};

sqlController.getAllRats = (req, res, next) => {
	const text = 'SELECT longitude, latitude FROM public.rat';
	db.query(text)
		.then((data) => {
			const resArr = [];

			data.rows.forEach((location) => {
				resArr.push([location.longitude, location.latitude]);
			});

			res.locals.ratsArr = resArr;
			// console.log(resArr);
			return next();
		})
		.catch((err) => {
			console.log(err);
			return next(err);
		});
};
//get user profile
// sqlController.getProfile = (req, res, next) => {
// 	const text = 'SELECT * FROM users WHERE "username" = $1';
// 	const values = [req.params.username];
// 	console.log('values: ', values);
// 	db.query(text, values)
// 		.then((data) => {
// 			if (data.rows.length === 0) {
// 				return res.status(404).json({ message: 'Profile not found' });
// 			}
// 			console.log('data : ', data.rows[0]);
// 			res.locals.profile = data.rows[0];
// 			return next();
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			return next(err);
// 		});
// };

// //get rats info
// sqlController.getRat = (req, res, next) => {
// 	const text = 'SELECT * FROM rats WHERE "name" = $1';
// 	const values = [req.params.name];
// 	console.log('values: ', values);
// 	db.query(text, values)
// 		.then((data) => {
// 			if (data.rows.length === 0) {
// 				return res.status(200).json({ message: 'Rat not found' });
// 			}
// 			console.log('data : ', data.rows[0]);
// 			res.locals.rat = data.rows[0];
// 			return next();
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			return next(err);
// 		});
// };

// //get sighting info for a single location
// sqlController.getSighting = (req, res, next) => {
// 	const text =
// 		'SELECT u.username AS username, s.location AS location, s.time AS time, s.description AS description, r.name AS rat_name, r.image AS rat_image, r.description AS rat_description, r.alive AS rat_alive, r.times_sighted AS times_sighted FROM sighting s JOIN users u ON s.users_id=u._id JOIN rats r ON s.rats_id=r._id WHERE s.location=$1;';
// 	const values = [req.params.location];
// 	console.log('values: ', values);
// 	db.query(text, values)
// 		.then((data) => {
// 			if (data.rows.length === 0) {
// 				return res.status(200).json({ message: 'sighting not found' });
// 			}
// 			console.log('data : ', data.rows[0]);
// 			res.locals.sighting = data.rows[0];
// 			return next();
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			return next(err);
// 		});
// };

// // get sighting info for single location--req.body version
// sqlController.getSingleSighting = (req, res, next) => {
// 	const text =
// 		'SELECT u.username AS username, s.location AS location, s.time AS time, s.description AS description, r.name AS rat_name, r.image AS rat_image, r.description AS rat_description, r.alive AS rat_alive, r.times_sighted AS times_sighted FROM sighting s JOIN users u ON s.users_id=u._id JOIN rats r ON s.rats_id=r._id WHERE s.location=$1;';
// 	const values = [req.body.location];
// 	console.log('values: ', values);
// 	db.query(text, values)
// 		.then((data) => {
// 			if (data.rows.length === 0) {
// 				return res.status(200).json({ message: 'sighting not found' });
// 			}
// 			console.log('data : ', data.rows[0]);
// 			res.locals.sighting = data.rows[0];
// 			return next();
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			return next(err);
// 		});
// };

// //create user profile
// sqlController.addProfile = (req, res, next) => {
// 	const text =
// 		'INSERT INTO users ("username", "password", "ssid", "number_sightings", "profile_picture", "favorite_rat", "created_at") VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *;';

// 	const values = [
// 		req.body.username,
// 		req.body.password,
// 		req.body.ssid,
// 		req.body.number_sightings,
// 		req.body.profile_picture,
// 		req.body.favorite_rat,
// 		'NOW()',
// 	];

// 	db.query(text, values)
// 		.then((data) => {
// 			console.log('data: ', data.rows);
// 			return next();
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			return next(err);
// 		});
// };

// //create rats info
// sqlController.addRat = (req, res, next) => {
// 	console.log('entering addRat');
// 	const text =
// 		'INSERT INTO rats ("name", "image", "description", "alive", "times_sighted") VALUES ($1,$2,$3,$4,$5) RETURNING *;';

// 	const values = [
// 		req.body.name,
// 		req.body.image,
// 		req.body.description,
// 		req.body.alive,
// 		'NOW()',
// 	];

// 	db.query(text, values)
// 		.then((data) => {
// 			console.log('data: ', data.rows);
// 			return next();
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			return next(err);
// 		});
// };

// //post: create sighting info
// sqlController.addSighting = (req, res, next) => {
// 	console.log('entering addSighting');
// 	const text =
// 		'INSERT INTO sightings ("rats_id", "users_id", "location", "time", "description") VALUES ($1,$2,$3,$4,$5) RETURNING *;';

// 	const values = [
// 		req.body.rats_id,
// 		req.body.users_id,
// 		req.body.location,
// 		'NOW()',
// 		req.body.description,
// 	];

// 	db.query(text, values)
// 		.then((data) => {
// 			console.log('data: ', data.rows);
// 			return next();
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			return next(err);
// 		});
// };

// // Create sighting alt version, checking for existing rat beforehand
// sqlController.addSightingAlt = (req, res, next) => {
// 	console.log('entering addSightingAlt');
// 	const getRatText = 'SELECT _id FROM rats WHERE name=$1';
// 	const getRatValues = [req.body.rat_name];
// 	db.query(getRatText, getRatValues).then((data) => {
// 		const rat = data.rows[0];
// 		if (rat._id) {
// 			// req.body.description,location, rat_name, username
// 			const text =
// 				'INSERT INTO sightings ("rats_id", "users_id", "location", "time", "description") VALUES ($1,$2,$3,$4,$5) RETURNING *;';
// 			const values = [
// 				rat._id,
// 				req.body.users_id,
// 				req.body.location,
// 				'NOW()',
// 				req.body.description,
// 			];

// 			db.query(text, values)
// 				.then((data) => {
// 					console.log('data: ', data.rows);
// 					return next();
// 				})
// 				.catch((err) => {
// 					console.log(err);
// 					return next(err);
// 				});
// 		} else {
// 			// req.body.description,location, rat_name, username
// 			const text =
// 				'INSERT INTO rats ("name", "image", "description", "alive", "times_sighted") VALUES ($1,$2,$3,$4,$5) RETURNING *;';
// 			const values = [
// 				req.body.rat_name,
// 				'no image',
// 				'A gigantic rat.',
// 				true,
// 				1,
// 			];

// 			db.query(text, values)
// 				.then((data) => {
// 					console.log('data: ', data.rows);

// 					const ISText =
// 						'INSERT INTO sightings ("rats_id", "users_id", "location", "time", "description") VALUES ($1,$2,$3,$4,$5) RETURNING *;';
// 					const ISValues = [
// 						rat._id,
// 						req.body.users_id,
// 						req.body.location,
// 						'NOW()',
// 						req.body.description,
// 					];

// 					db.query(ISText, ISValues)
// 						.then((data) => {
// 							console.log('data: ', data.rows);
// 							return next();
// 						})
// 						.catch((err) => {
// 							console.log(err);
// 							return next(err);
// 						});
// 				})
// 				.catch((err) => {
// 					console.log(err);
// 					return next(err);
// 				});
// 		}
// 	});

// 	db.query(text, values)
// 		.then((data) => {
// 			console.log('data: ', data.rows);
// 			return next();
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			return next(err);
// 		});
// };

// //delete user profile

// //delete rat profile

// // Get all sightings info
// sqlController.getAllSightings = (req, res, next) => {
// 	const username = req.body.username;
// 	// const ssid = req.cookies.ssid;
// 	const text =
// 		'SELECT s.location AS location, s.time AS time, s.description AS description, r.name AS rat_name, r.image AS rat_image, r.description AS rat_description, r.alive AS rat_alive, r.times_sighted AS times_sighted FROM sighting s JOIN users u ON s.users_id=u._id JOIN rats r ON s.rats_id=r._id WHERE u.username=$1;';

// 	const values = [username];
// 	db.query(text, values)
// 		.then((data) => {
// 			res.locals.sightings = data;
// 			return next();
// 		})
// 		.catch((err) => next({ log: err, message: 'Error retrieving sightings.' }));
// };

module.exports = sqlController;
const db = require('../../server/models/sqlModels.js');
const sqlController = {};

sqlController.addNewRat = async (req, res, next) => {
	const text = `INSERT INTO public.rat (latitude, longitude, time) VALUES($1, $2, $3)`;

	const values = [req.body.location.lat, req.body.location.lng, 'NOW()'];

	// console.log(req.body.location);

	await db.query(text, values)
		.then((data) => {
			// console.log('data: ', data.rows);
			res.locals.newRat = data.rows;
			return next();
		})
		.catch((err) => {
			console.log(err);
			return next(err);
		});
};
sqlController.getAllRats = async (req, res, next) => {
	const text = 'SELECT longitude, latitude FROM public.rat';
	await db.query(text)
		.then((data) => {
			const resArr = [];

			data.rows.forEach((location) => {
				resArr.push([location.longitude, location.latitude]);
			});

			res.locals.ratsArr = resArr;
			// console.log(resArr);
			return next();
		})
		.catch((err) => {
			console.log(err);
			return next(err);
		});
};
//get user profile
// sqlController.getProfile = (req, res, next) => {
// 	const text = 'SELECT * FROM users WHERE "username" = $1';
// 	const values = [req.params.username];
// 	console.log('values: ', values);
// 	db.query(text, values)
// 		.then((data) => {
// 			if (data.rows.length === 0) {
// 				return res.status(404).json({ message: 'Profile not found' });
// 			}
// 			console.log('data : ', data.rows[0]);
// 			res.locals.profile = data.rows[0];
// 			return next();
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			return next(err);
// 		});
// };

// //get rats info
// sqlController.getRat = (req, res, next) => {
// 	const text = 'SELECT * FROM rats WHERE "name" = $1';
// 	const values = [req.params.name];
// 	console.log('values: ', values);
// 	db.query(text, values)
// 		.then((data) => {
// 			if (data.rows.length === 0) {
// 				return res.status(200).json({ message: 'Rat not found' });
// 			}
// 			console.log('data : ', data.rows[0]);
// 			res.locals.rat = data.rows[0];
// 			return next();
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			return next(err);
// 		});
// };

// //get sighting info for a single location
// sqlController.getSighting = (req, res, next) => {
// 	const text =
// 		'SELECT u.username AS username, s.location AS location, s.time AS time, s.description AS description, r.name AS rat_name, r.image AS rat_image, r.description AS rat_description, r.alive AS rat_alive, r.times_sighted AS times_sighted FROM sighting s JOIN users u ON s.users_id=u._id JOIN rats r ON s.rats_id=r._id WHERE s.location=$1;';
// 	const values = [req.params.location];
// 	console.log('values: ', values);
// 	db.query(text, values)
// 		.then((data) => {
// 			if (data.rows.length === 0) {
// 				return res.status(200).json({ message: 'sighting not found' });
// 			}
// 			console.log('data : ', data.rows[0]);
// 			res.locals.sighting = data.rows[0];
// 			return next();
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			return next(err);
// 		});
// };

// // get sighting info for single location--req.body version
// sqlController.getSingleSighting = (req, res, next) => {
// 	const text =
// 		'SELECT u.username AS username, s.location AS location, s.time AS time, s.description AS description, r.name AS rat_name, r.image AS rat_image, r.description AS rat_description, r.alive AS rat_alive, r.times_sighted AS times_sighted FROM sighting s JOIN users u ON s.users_id=u._id JOIN rats r ON s.rats_id=r._id WHERE s.location=$1;';
// 	const values = [req.body.location];
// 	console.log('values: ', values);
// 	db.query(text, values)
// 		.then((data) => {
// 			if (data.rows.length === 0) {
// 				return res.status(200).json({ message: 'sighting not found' });
// 			}
// 			console.log('data : ', data.rows[0]);
// 			res.locals.sighting = data.rows[0];
// 			return next();
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			return next(err);
// 		});
// };

// //create user profile
// sqlController.addProfile = (req, res, next) => {
// 	const text =
// 		'INSERT INTO users ("username", "password", "ssid", "number_sightings", "profile_picture", "favorite_rat", "created_at") VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *;';

// 	const values = [
// 		req.body.username,
// 		req.body.password,
// 		req.body.ssid,
// 		req.body.number_sightings,
// 		req.body.profile_picture,
// 		req.body.favorite_rat,
// 		'NOW()',
// 	];

// 	db.query(text, values)
// 		.then((data) => {
// 			console.log('data: ', data.rows);
// 			return next();
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			return next(err);
// 		});
// };

// //create rats info
// sqlController.addRat = (req, res, next) => {
// 	console.log('entering addRat');
// 	const text =
// 		'INSERT INTO rats ("name", "image", "description", "alive", "times_sighted") VALUES ($1,$2,$3,$4,$5) RETURNING *;';

// 	const values = [
// 		req.body.name,
// 		req.body.image,
// 		req.body.description,
// 		req.body.alive,
// 		'NOW()',
// 	];

// 	db.query(text, values)
// 		.then((data) => {
// 			console.log('data: ', data.rows);
// 			return next();
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			return next(err);
// 		});
// };

// //post: create sighting info
// sqlController.addSighting = (req, res, next) => {
// 	console.log('entering addSighting');
// 	const text =
// 		'INSERT INTO sightings ("rats_id", "users_id", "location", "time", "description") VALUES ($1,$2,$3,$4,$5) RETURNING *;';

// 	const values = [
// 		req.body.rats_id,
// 		req.body.users_id,
// 		req.body.location,
// 		'NOW()',
// 		req.body.description,
// 	];

// 	db.query(text, values)
// 		.then((data) => {
// 			console.log('data: ', data.rows);
// 			return next();
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			return next(err);
// 		});
// };

// // Create sighting alt version, checking for existing rat beforehand
// sqlController.addSightingAlt = (req, res, next) => {
// 	console.log('entering addSightingAlt');
// 	const getRatText = 'SELECT _id FROM rats WHERE name=$1';
// 	const getRatValues = [req.body.rat_name];
// 	db.query(getRatText, getRatValues).then((data) => {
// 		const rat = data.rows[0];
// 		if (rat._id) {
// 			// req.body.description,location, rat_name, username
// 			const text =
// 				'INSERT INTO sightings ("rats_id", "users_id", "location", "time", "description") VALUES ($1,$2,$3,$4,$5) RETURNING *;';
// 			const values = [
// 				rat._id,
// 				req.body.users_id,
// 				req.body.location,
// 				'NOW()',
// 				req.body.description,
// 			];

// 			db.query(text, values)
// 				.then((data) => {
// 					console.log('data: ', data.rows);
// 					return next();
// 				})
// 				.catch((err) => {
// 					console.log(err);
// 					return next(err);
// 				});
// 		} else {
// 			// req.body.description,location, rat_name, username
// 			const text =
// 				'INSERT INTO rats ("name", "image", "description", "alive", "times_sighted") VALUES ($1,$2,$3,$4,$5) RETURNING *;';
// 			const values = [
// 				req.body.rat_name,
// 				'no image',
// 				'A gigantic rat.',
// 				true,
// 				1,
// 			];

// 			db.query(text, values)
// 				.then((data) => {
// 					console.log('data: ', data.rows);

// 					const ISText =
// 						'INSERT INTO sightings ("rats_id", "users_id", "location", "time", "description") VALUES ($1,$2,$3,$4,$5) RETURNING *;';
// 					const ISValues = [
// 						rat._id,
// 						req.body.users_id,
// 						req.body.location,
// 						'NOW()',
// 						req.body.description,
// 					];

// 					db.query(ISText, ISValues)
// 						.then((data) => {
// 							console.log('data: ', data.rows);
// 							return next();
// 						})
// 						.catch((err) => {
// 							console.log(err);
// 							return next(err);
// 						});
// 				})
// 				.catch((err) => {
// 					console.log(err);
// 					return next(err);
// 				});
// 		}
// 	});

// 	db.query(text, values)
// 		.then((data) => {
// 			console.log('data: ', data.rows);
// 			return next();
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			return next(err);
// 		});
// };

// //delete user profile

// //delete rat profile

// // Get all sightings info
// sqlController.getAllSightings = (req, res, next) => {
// 	const username = req.body.username;
// 	// const ssid = req.cookies.ssid;
// 	const text =
// 		'SELECT s.location AS location, s.time AS time, s.description AS description, r.name AS rat_name, r.image AS rat_image, r.description AS rat_description, r.alive AS rat_alive, r.times_sighted AS times_sighted FROM sighting s JOIN users u ON s.users_id=u._id JOIN rats r ON s.rats_id=r._id WHERE u.username=$1;';

// 	const values = [username];
// 	db.query(text, values)
// 		.then((data) => {
// 			res.locals.sightings = data;
// 			return next();
// 		})
// 		.catch((err) => next({ log: err, message: 'Error retrieving sightings.' }));
// };

module.exports = sqlController;
