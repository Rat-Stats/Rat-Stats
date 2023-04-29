const db = require('../models/sqlModels.js');

const sqlController = {};

//middlewaves for sql query

//post: create user info

sqlController.createUser = (req, res, next) => {
  // write code here
  const text = 'INSERT INTO users ("username", "password", "ssid", "number_sightings", "profile_picture", "favorite_rat", "created_at") VALUES ($1,$2,$3,$4,$5,$6,$7)'
  

  // res.locals.newCharacter
  db.query(text).then( data => {

    return next();
  });
  
};

//get: read user info

//get: read rat info

//get: read sighting info


//post: create rats info

//post: create sighting info


module.exports = sqlController;