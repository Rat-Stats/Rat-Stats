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
    prisma.$disconnect()
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
            },
          },
        },
      },
    });
    prisma.$disconnect()
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
  // console.log('inside allSightings middleware')
  try {
    const allSightings = await prisma.sighting.findMany({
      include: {
        user: true,
        rat: true
      }
    });
    prisma.$disconnect()
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

// get all sightings in the db associated with a particular user
prismaSightingController.findSighting = async (req, res, next) => {
  const { username } = req.query;
  if (!username) {
    const errObj = {
      message: "Error, missing username in request body"
    }
    return next(errObj);
  }
  try {

    // find all the sightings where their associated user's username is username
    const userSightings = await prisma.sighting.findMany({
      where: {
        user: {
          username: username,
        },
      },
      include: {
        user: true,
        rat: true
      }
    });
    prisma.$disconnect()
    res.locals.userSightings = userSightings;
    return next();
  }
  catch (err) {
    console.log(err);
    const errObj = {  
      message: "Error finding sightings in database"
    }
    return next(errObj);
  }
}

// delete a sighting
prismaSightingController.deleteSighting = async (req, res, next) => {
  const { id } = req.body;
  if (!id) {
    const errObj = {
      message: "Error, missing id in request body"
    }
    return next(errObj);
  }

  try {
    // deletes the sighting and then returns it in res locals
    const deletedSighting = await prisma.sighting.delete({
      where: {
        id: id
      }
    })
    prisma.$disconnect()
    res.locals.deletedSighting = deletedSighting;
    return next();
  }
  catch (err) {
    console.log(err);
    const errObj ={
      message: "Error deleting sighting from db"
    }
    return next(errObj)
  }
}

prismaSightingController.getSighting = async (req, res, next) => {
  const { id } = req.params;
  try {
    const rat = await prisma.sighting.findUnique({
      where: {
        id: Number(id),
      },
    });
    prisma.$disconnect()
    if (rat) {
      res.json(rat);
      next();
    } else {
      next({ message: 'Rat not found' });
    }
  } catch (error) {
    console.error('Error checking rat in the database:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

prismaSightingController.getRatInfo = async (req, res, next) => {
  const ratId = req.params.ratId;
  // console.log('oopsie getRatInfo middleware', req.params.ratId)
  try {
    const ratInfo = await prisma.rat.findUnique({
      where: {
        id: parseInt(ratId),
      },
    });
    prisma.$disconnect()
    if (ratInfo) {
      res.json(ratInfo);
      next();
    } else {
      next({ message: 'Rat info not found' });
    }
  } catch (error) {
    console.error('Error checking rat info in the database:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



module.exports = prismaSightingController;