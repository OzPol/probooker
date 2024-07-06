require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  console.log('Connected to database:', databaseUrl);

  const users = await prisma.user.findMany();
  console.log(users);
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
