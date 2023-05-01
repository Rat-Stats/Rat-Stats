const cookieController = {};
const User = require('../models/mongoModels');

//setCookie
cookieController.setCookie = (req, res, next) => {
  res.cookie('rat','cookie');
  return next();
}

// setSSIDCookie - store the user id in a cookie
cookieController.setSSIDCookie = (req, res, next) => {

  res.cookie('ssid',res.locals.user._id,{httpOnly:true})
  console.log('ssid: ', res.locals.user._id);
  return next();
}

module.exports = cookieController;