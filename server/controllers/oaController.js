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
    // Grab url query parameters from the request object
    const { state } = req.query;
    //  3rd-party attack prevention: compare state string we sent against what we got back
    if (state === STATE) console.log('state === STATE');
    else return next({ log: 'State does not match.', status: 500, message: 'OAuth error.'})
    // If state matches continue
    return next();
  },

  oaRequestAccessToken: (req, res, next) => {
    // console.log('Running oaRequestAccessToken middleware');
    const { code } = req.query;
    const githubUrl = `https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`;
    fetch(githubUrl, {
      method: "POST",
      headers: {
        Accept: "application/json"
      }
    })
    .then((data) => data.json())
    .then((parsed) => {
      console.log('Access token: ', parsed.access_token);
      res.locals.accessToken = parsed.access_token;
      return next();
    })
    .catch((err) => next({ log: err, message: 'OAuth error.'}))
  },

  oaGetUserData: (req, res, next) => {
    console.log('Running oaGetUserData middleware');
    const authString = `Bearer ${res.locals.accessToken}`; 
    console.log(authString);

    fetch('https://api.github.com/user', {
      method: "GET",
      headers: {
        "Authorization": authString
      }
    })
    .then((data) => data.json())
    .then((parsed) => {
      const { login, id, avatar_url } = parsed;
      res.locals.userData = { login, id, avatar_url };
      console.log('user data: ', res.locals.userData);
      return next();
    })
    .catch((err) => next({ log: err, message: 'OAuth error.' }))
  },

  oaSaveUserData: (req, res, next) => {
    console.log('Running oaSaveUserData middleware.');
    const { login, id, avatar_url } = res.locals.userData;
    OAUser.findOne({ id })
    .then((data) => {
      console.log('Found user: ', data);
      if (data !== null) {
        res.locals.cookies = { ssid: data._id.toString()};
        console.log('User not null, current SSID: ', res.locals.ssid)
        return next();
      };
      console.log('User not found, creating user.')
      OAUser.create({ login, id, avatar_url })
      .then((data) => {
        console.log('Created user: ', data);
        res.locals.cookies = { ssid: data._id.toString()};
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
    console.log('Running oaSetCookie middleware');
    const cookies = res.locals.cookies;
    console.log('Setting cookes: ')
    for (const key in cookies) {
      console.log(key, ':', cookies[key])
      res.cookie(key, cookies[key], { httpOnly: true });
    }
    return next();
  },

  oaStartSession: (req, res, next) => {
    console.log('Running oaStartSession middleware');
    OASession.findOneAndUpdate({ cookieId: res.locals.cookies.ssid }, { cookieId: res.locals.cookies.ssid }, { new: true, upsert: true })
    .then((data) => {
      console.log('Session started: ', data);
      return next();
    })
    .catch((err) => next({ log: err, message: 'OAuth error.'}));
  },

  oaCheckSession: (req, res, next) => {
    if (!req.cookies.ssid) {
      res.locals.activeSession = false;
      return next();
    }

    console.log('Running oaCheckSession middleware.');
    OASession.findOne({ cookieId: req.cookies.ssid })
    .then((data) => {
      if (data !== null) res.locals.activeSession = true;
      else res.locals.activeSession = false;
      return next();
    })
    .catch((err) => next({ log: err, message: "OAuth error." }))
  }

}