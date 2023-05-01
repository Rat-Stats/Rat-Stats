require('dotenv').config();
const OAUser = require('../models/oaUserModel.js')
const OASession = require('../models/oaSessionModel.js')

// ID and secret given by GitHub when we registered our app
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
// A string used to guard against third party attacks
const STATE = process.env.STATE;

module.exports = {

  oaCheckState: (req, res, next) => {
    // console.log('Running onCheckState middleware');
    // Grab query variable 'state' from the request
    const { state } = req.query;
    // Third-party attack prevention: compare state string we initally sent 
    // against what we got back
    if (state === STATE) console.log('state === STATE');
    // If state does not match, then we received an authentication request from a
    // malicious third party. Deny request.
    else return next({ log: 'State does not match.', status: 500, message: 'OAuth error.'})
    // If state matches, continue onto next part of authentication.
    return next();
  },

  oaRequestAccessToken: (req, res, next) => {
    // console.log('Running oaRequestAccessToken middleware');
    // Grab query variable 'code' from the request. This code is used to authorize 
    // an authentication session on GH's end, and expires after a set time. Can be
    // thought of like a temporary two-factor identification code.
    const { code } = req.query;
    // Make a request for authorization to GH, sending GH our app's identifying info
    // and our authorization code (i.e. that 'temp 2FA code').
    const githubUrl = `https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`;
    fetch(githubUrl, {
      method: "POST",
      headers: {
        Accept: "application/json"
      }
    })
    // If our request is successful, we receive an access token from GH.
    // This allows us to access the user's GH information on behalf of the user.
    .then((data) => data.json())
    .then((parsed) => {
      // console.log('Access token: ', parsed.access_token);
      // We save the received access token to res.locals for use by other middleware
      res.locals.accessToken = parsed.access_token;
      return next();
    })
    .catch((err) => next({ log: err, message: 'OAuth error.'}))
  },

  oaGetUserData: (req, res, next) => {
    // console.log('Running oaGetUserData middleware');
    // Create the string to be used in the 'Authorization' header in our fetch request.
    const authString = `Bearer ${res.locals.accessToken}`;  
    // Create a fetch request to GH for our user's GH account data, passing in
    // the access token we received from GH in our previous step.
    fetch('https://api.github.com/user', {
      method: "GET",
      headers: {
        "Authorization": authString
      }
    })
    .then((data) => data.json())
    .then((parsed) => {
      // Deconstruct the properties we want from the GH user data we received back
      const { login, id, avatar_url } = parsed;
      // Store the GH user data in res.locals
      res.locals.userData = { login, id, avatar_url };
      return next();
    })
    .catch((err) => next({ log: err, message: 'OAuth error.' }))
  },

  oaSaveUserData: (req, res, next) => {
    // console.log('Running oaSaveUserData middleware.');
    // Deconstruct the GH user data we previously stored in res.locals
    const { login, id, avatar_url } = res.locals.userData;
    // Before we create a new user document in our database, check if the user already exists
    OAUser.findOne({ id })
    .then((data) => {
      // console.log('Found user: ', data);
      // If the user already exists, don't create a new user document in our database.
      // Just look in the document we found for the existing user's ssid, and store it
      // in res.locals for use in later parts of the login process.
      if (data !== null) {
        res.locals.cookies = { ssid: data._id.toString() };
        console.log('User not null, current SSID: ', res.locals.ssid)
        return next();
      };
      // console.log('User not found, creating user.')
      // If the user doesn't already exist, create a new user document.
      OAUser.create({ login, id, avatar_url })
      .then((data) => {
        // console.log('Created user: ', data);
        // Store new user's ssid in res.locals for use in later parts of the login process.
        res.locals.cookies = { ssid: data._id.toString() };
        return next();
      })
      .catch((err) => next({ log: err, message: 'OAuth error.'}));
    })
    .catch((err) => {
      console.log(err);
      return next();
    });
  },

  oaSetCookie: (req, res, next) => {
    // console.log('Running oaSetCookie middleware');
    // Grab the relevant cookies we want to set from our res.locals storage
    const cookies = res.locals.cookies;
    // console.log('Setting cookes: ')
    // Use a 'for in' loop to dynamically set an arbitray number of cookies. 
    // Not relevant now, but useful if we eventually want to set multiple cookies
    // for the user, storing more than just authentication information.
    for (const key in cookies) {
      // console.log(key, ':', cookies[key])
      res.cookie(key, cookies[key], { httpOnly: true });
    }
    return next();
  },

  oaStartSession: (req, res, next) => {
    // console.log('Running oaStartSession middleware');
    // Create a new user session if one does not exist; otherwise, refresh the 
    // expiration timer on the current session.
    OASession.findOneAndUpdate({ cookieId: res.locals.cookies.ssid }, { cookieId: res.locals.cookies.ssid }, { new: true, upsert: true })
    .then((data) => {
      // console.log('Session started: ', data);
      return next();
    })
    .catch((err) => next({ log: err, message: 'OAuth error.'}));
  },

  oaCheckSession: (req, res, next) => {
    // console.log('Running oaCheckSession middleware.');
    // Check if the user has an ssid cookie set; if not, they do not have a valid session
    if (!req.cookies.ssid) {
      res.locals.activeSession = false;
      return next();
    }
    // If user has an ssid cookie set, check if a valid session exists for that ssid.
    OASession.findOne({ cookieId: req.cookies.ssid })
    .then((data) => {
      // If a session does exist, set activeSession flag to true, else set flag to false.
      if (data !== null) res.locals.activeSession = true;
      else res.locals.activeSession = false;
      return next();
    })
    .catch((err) => next({ log: err, message: "OAuth error." }))
  }

}