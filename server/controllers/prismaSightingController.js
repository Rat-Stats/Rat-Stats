const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const prismaSightingController = {};

prismaSightingController.addSighting = async (req, res, next) => {
  // take everything from body
  const { rat_name, user_name, lat, lng, description } = req.body;
  // make sure all the fields are there
  if (!rat_name || !user_name || !lat || !lng || !description) {
    const errObj = {
      message: "Error, missing one of the fields in body"
    }
    return next(errObj);
  }

  // 
  try {
    // first find user
    const user = await prisma.user.findUnique({
      where: {
        username: user_name,
      }
    });
    if (!user){
      const errObj = {
        message: "Error, user not found"
      }
      return next(errObj);
    }
    // this query 
    const createSighting = await prisma.sighting.create({
      data: {
        lat: lat, 
        lng: lng,
        description: description,
        user: {
          connect: {
            id: user.id
          }
        },
        rat: {
          connectOrCreate: {
            where: {
              name: rat_name
            },
            create: {
              name: rat_name,
              description: description,
              times_sighted: 1
            },
          },
        },
      },
    });
    res.locals.sighting = createSighting;
    return next();
  }
  catch (err) {
    const errObj = {
      message: "Error, did not successfully post sighting to database"
    }
    return next(errObj);
  }
}

// returns all the sightings
prismaSightingController.allSightings = async (req, res, next) => {
  try {
    const allSightings = await prisma.sighting.findMany();
    res.locals.allSightings = allSightings;
    return next();
  }
  catch (error) {
    const errObj = {
      message: "Error in getting all sightings from db"
    }
    return next(errObj);
  }
}

module.exports = prismaSightingController;