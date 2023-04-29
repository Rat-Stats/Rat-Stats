console.log('Importing sqlController');
const db = require('../../server/models/sqlModels.js');
console.log('Importing db');
const sqlController = {};


//get user profile
sqlController.getProfile = (req, res, next) => {
  const text = 'SELECT * FROM users WHERE "username" = $1';
  const values = [req.params.username];
  console.log('values: ',values)
  db.query(text, values)
    .then((data) => {
      if (data.rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      console.log('data : ',data.rows[0])
      res.locals.profile = data.rows[0];
      return next();
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

//get rats info
sqlController.getRat = (req, res, next) => {
  const text = 'SELECT * FROM rats WHERE "_id" = $1';
  const values = [req.params._id];
  console.log('values: ',values)
  db.query(text, values)
    .then((data) => {
      if (data.rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      console.log('data : ',data.rows[0])
      res.locals.rat = data.rows[0];
      return next();
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

//create user profile
sqlController.addProfile = (req, res, next) => {

  const text = 'INSERT INTO users ("username", "password", "ssid", "number_sightings", "profile_picture", "favorite_rat", "created_at") VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *;';

  const values = [req.body.username, req.body.password, req.body.ssid, req.body.number_sightings, req.body.profile_picture, req.body.favorite_rat, 'NOW()'];

  db.query(text, values)
    .then((data) => {
      console.log("data: ",data.rows)
      return next();
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};


//create rats info
sqlController.addRat = (req, res, next) => {
  console.log('entering addRat')
  const text = 'INSERT INTO rats ("name", "image", "description", "alive", "times_sighted") VALUES ($1,$2,$3,$4,$5) RETURNING *;';

  const values = [req.body.name, req.body.image, req.body.description, req.body.alive, 'NOW()'];

  db.query(text, values)
    .then((data) => {
      console.log("data: ",data.rows)
      return next();
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

//post: create sighting info
sqlController.addSighting = (req, res, next) => {
  console.log('entering addSighting')
  const text = 'INSERT INTO rats ("rats_id", "users_id", "location", "time", "description") VALUES ($1,$2,$3,$4,$5) RETURNING *;';

  const values = [req.body.rats_id, req.body.users_id, req.body.location, 'NOW()', req.body.description];

  db.query(text, values)
    .then((data) => {
      console.log("data: ",data.rows)
      return next();
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

//delete user profile

//delete rat profile





module.exports = sqlController;