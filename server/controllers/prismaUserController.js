const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const prismaUserController = {};

/**
 * Route to post a user to the database
 * req body: {
 *  usernam
 *  ssid
 * number of sightings    defaults -> 1
 * profile picture        optional
 * favorite_rat           optional  
 * created_at             Dont enter  
 * }
 */
prismaUserController.addUser = async (req, res, next) => {
  const { username, ssid, number_sightings, profile_picture, favorite_rat } = req.body;
  // check if the required information is therer
  if (!username || !ssid) {
    errObj = {
      message: "error, username or ssid not included in body",
    }
    return next(errObj);
  }
  try {
    const createUser = await prisma.user.create({
      data: req.body
    })
    res.locals.posted = "success"
    res.locals.user = createUser;
    return next();
  }
  catch (err) {
    console.log(err);
    errObj = {
      message: "error encountered posting user to database"
    }
    return next(errObj);
  }
}

module.exports = prismaUserController;