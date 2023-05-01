const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Bcrypt hashing is unused since we do not store user passwords in our database.
// OAuth login sets an ssid cookie in the user's browser (see oaSetCookie middelware
// in oaController.js) and starts a session tied to that 
// 
const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcrypt');

// Login = username, id = GH's unique numeric identifier for a user account
const oaUserSchema = new Schema({
  login: { type: String, unique: true, required: true },
  id: { type: Number, unique: true, required: true },
  avatar_url: { type: String, required: true }
});

module.exports = mongoose.model('OAUser', oaUserSchema);