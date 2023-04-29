require('dotenv').config();
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const STATE = 'test_state';

module.exports = {

  oaCheckState: (req, res, next) => {
    console.log('Entering onCheckState middleware');
    console.log(req.query);
    // Grab url query parameters from the request object
    const { state } = req.query;
    // Check if state from response matches what we sent to catch third party attacks
    if (state === STATE) console.log('state === STATE');
    else return next({ log: 'State does not match.', status: 500, message: 'OAuth error.'})
    // If state matches continue
    return next();
  },

  oaRequestAccessToken: (req, res, next) => {
    console.log('Running oaRequestAccessToken middleware');
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
      console.log('user data: ', parsed);
      res.locals.userData = parsed;
      next();
    })
    .catch((err) => next({ log: err, message: 'OAuth error.' }))
  },

  oaSaveUserData: (req, res) => {
    console.log('Running oaSaveUserData middleware.');
    const { login, id, avatar_url } = res.locals.userData;
    return next();
  }
}