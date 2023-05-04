const { PrismaClient } = require('@prisma/client');
// const errors = require('eslint-plugin-import/config/errors');

const prisma = new PrismaClient();

const prismaRatController = {};

prismaRatController.allRatsSorted = async (req, res, next) => {
  try{
    
    // const ratsOrderedBySightings = await prisma.$queryRaw`
    // SELECT "Rat"."id", "Rat"."name", "Rat"."image", "Rat"."description", "Rat"."alive", COUNT("Sighting"."id") as "sightingsCount"
    // FROM "Rat"
    // LEFT JOIN "Sighting" ON "Rat"."id" = "Sighting"."ratId"
    // GROUP BY "Rat"."id"
    // ORDER BY "sightingsCount" DESC;
    // `;
    const ratsOrderedBySightings = await prisma.rat.findMany({
      include: {
        sightings: {
          select: {
            id: true,
          }
        }
      },
      orderBy: {
        sightings: {
          _count: 'desc',
        }
      }
    });

    const formatted = ratsOrderedBySightings.map((rat) => ({
      ...rat,
      sightings: rat.sightings.length
    }));

    res.locals.rats = formatted;
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