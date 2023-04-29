const express = require('express');
const router = express.Router();
const oaController = require('../controllers/oaController.js')

// OAuth login route
router.use('/login', oaController.oaLogin, (req, res) => {
  console.log('Hit oaRouter.js /login router callback.');
  res.status(200).json('Received response from /oauth/login');
});

module.exports = router;