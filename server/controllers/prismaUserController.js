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
};

/**
 * Route to get a user from the database
 * req body: {
 *  username
 * }
 */
prismaUserController.getUser = async (req, res, next) => {
  const { username } = req.query;
  if (!username) {
    errObj = {
      message: "error, username not included in body"
    }
    return next(errObj);
  }
  try {
    const getUser = await prisma.user.findUnique({
      where: {
        username: username
      }
    });

    const countSightings = await prisma.sighting.count({
      where: {
        userId: getUser.id
      }
    })

    const userWithSightings = {
      ...getUser,
      number_sightings: countSightings,
    }

    res.locals.user = userWithSightings;
    return next();
  }
  catch (error) {
    console.log(error);
    errObj = {
      message: "error fetching user from database"
    }
    return next(errObj);
  }
};

/**
 * Route to delete user from the database
 *req body: {
 * username
 * }
*/
prismaUserController.deleteUser = async (req, res, next) => {
  const { username } = req.body;
  if (!username) { 
    errObj = {
      message: "error, username not included in body"
    }
    return next(errObj);
  }
  try {
    const user = await prisma.user.delete({
      where: {
        username: username
      },
    })
    res.locals.user = user;
    return next();
  }
  catch (err) {
    errObj = {
      message: "error accessing the database"
    }
  }
}

/**
 * Route to update user info
 */
prismaUserController.updateUser = async (req, res, next) => {
  const { username, number_sightings, profile_picture, favorite_rat } = req.body;

  try {
    const updateUser = await prisma.user.update({
      where: {
        username: username,
      },
      data: {
        number_sightings: number_sightings,
        profile_picture: profile_picture,
        favorite_rat: favorite_rat,
      }
    })
    res.locals.user = updateUser;
    return next();
  }
  catch (err) {
    const errObj = {
      message: "Error encountered updating user in db"
    }
    return next(err);
  }
}

module.exports = prismaUserController;