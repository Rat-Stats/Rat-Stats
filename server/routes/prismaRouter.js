const express = require('express');
const router = express.Router();
const prismaUserController = require('../controllers/prismaUserController.js');

router.get('/', (req, res) => {
  res.status(200).send("your are reaching sql endpoint")  
}
);

// creates a user in the prisma database
router.post('/user', prismaUserController.addUser,(req, res) => {
  res.status(200).json(res.locals.user);
  }
);

module.exports = router;