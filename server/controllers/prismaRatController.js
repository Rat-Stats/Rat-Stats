const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const prismaRatController = {};

prismaRatController.allRatsSorted = async (req, res, next) => {
  try{
    let allRats = await prisma.rat.findMany({})
    allRats = await allRats.json();

    for (let i = 0; i < allRats.length; i++) {
      
    }
    

    res.locals.rats = allRats;
    return next();
  }
  catch (err) {
    console.log(err);
    const errObj = {
      message: "ERror getting rats from db"
    }
    return next(errObj);
  }

}

module.exports = prismaRatController;