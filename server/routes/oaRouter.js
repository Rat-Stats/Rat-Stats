const express = require('express');
const router = express.Router();
const oaController = require('../controllers/oaController.js')
require('dotenv').config();

// ID and secret given by GitHub when we registered our app
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
// A string used to guard against third party attacks
const STATE = process.env.STATE;

// Step 1: Redirect user login request to GH login page, providing our app's
// client_id and random string STATE as url parameters
router.use('/login', (req, res) => {
  res.status(200).redirect(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&state=${STATE}`);
});

router.use('/redirected', 
// Step 2: Once GH redirects user back, we confirm state matches what we sent to GH
oaController.oaCheckState, 
// Step 3: We request an access token from GH, giving GH our app's client id, 
// client secret, and a code we got back that authorizes this authentication session.
oaController.oaRequestAccessToken, 
// Step 4: Use access token to query GH API for user account data
oaController.oaGetUserData, 
// Step 5: Save user's GH account data if user does not exist in our database
oaController.oaSaveUserData,
// Step 6: Set an ssid cookie for our user based on user's _id field in database
oaController.oaSetCookie, 
// Step 7: Create a new session based on user's ssid cookie 
oaController.oaStartSession,
(req, res) => {
    // console.log('Hit oaRouter.js /redirected router callback!');
// Step 8: Redirect user to new endpoint that checks if they are logged in
    res.status(200).redirect('/oauth/isloggedin');
  });

// Step 9: If user is logged in (always yes if coming from /redirected endpoint), 
// direct user to their homepage. Otherwise, direct them to login page.
router.use('/isloggedin', oaController.oaCheckSession, (req, res) => {
  console.log('Hit oaRouter.js /isloggedin router callback');
  console.log('Active session: ', res.locals.activeSession);
  // Change endpoints for production build to localhost:3000, find way to use 
  // relative endpoints without overriding React Router
  if (res.locals.activeSession) res.status(200).redirect('http://localhost:8080/homepage');
  else res.status(200).redirect('http://localhost:8080/');
});

module.exports = router;