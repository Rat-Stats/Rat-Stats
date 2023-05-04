// only one instantiation of the prisma client across the files to reduce
// pool connections

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
module.exports = prisma;