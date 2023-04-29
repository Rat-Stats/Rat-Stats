const express = require('express');
const router = express.Router();
const sqlController = require('../controllers/sqlController.js');

//get user profile
//get rat info
//get sighting info
router.get('/', (req, res) => {
  res.status(200).send("your are reaching sql endpoint")  
  }
);

//create user
//create rats
//create sighting


router.post('/', (req, res) => {
  res.status(200).json({})
  }
);

module.exports = router;