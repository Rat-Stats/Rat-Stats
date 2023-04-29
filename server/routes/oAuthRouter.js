const express = require('express');
const router = express.Router();

// OAuth login route
router.post('/login', (req, res) => {
  console.log('Hit OAuth login router callback');
  res.status(200).json('Hit OAuth router.');
});

module.exports = router;