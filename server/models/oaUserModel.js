const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcrypt');

const oaUserSchema = new Schema({
  login: { type: String, unique: true, required: true },
  id: { type: Number, unique: true, required: true },
  avatar_url: { type: String, required: true }
});

module.exports = mongoose.model('OAUser', oaUserSchema);