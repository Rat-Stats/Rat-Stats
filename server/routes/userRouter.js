const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const cookieController = require('../controllers/cookieController.js');
const sessionController = require('../controllers/sessionController.js');

//set cookie
router.get('/',cookieController.setCookie,(req,res)=> {
  res.status(200).send('cookie has been sent')
})

//signup
router.post('/signup', userController.createUser,(req,res) => {
  res.status(200).redirect('/homepage');
})

//verify user
router.post('/login',
  userController.verifyUser,
  cookieController.setSSIDCookie,
  (req,res) => {
  console.log('login')
  res.status(200).redirect('http://google.com');
})

module.exports = router;