const express = require('express');
const router = express.Router();
const oaController = require('../controllers/oaController.js')
require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SILENT = process.env.CLIENT_SILENT;
const STATE = 'test_state'

// Direct user's OAuth login request to GitHub 
/*
  Step 1: Redirect user login request to GitHub login page, providing our app's
  client_id (which we got by registering our app on GitHub) as a url parameter
*/
router.use('/login', (req, res) => {
  res.status(200).redirect(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&state=${STATE}`);
});

router.use('/redirected', oaController.oaCheckState, oaController.oaRequestAccessToken, oaController.oaGetUserData, (req, res) => {
    console.log('Hit oaRouter.js /redirected router callback!');
    res.status(200).json('Received response from /oauth/redirected');
  });

router.use('/loggedin', (req, res) => {
  console.log('Hit oaRouter.js /loggedin router callback');
  res.status(200).json('Logged in and redirecting..');
});

module.exports = router;