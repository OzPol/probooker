// models/User.ts
// User model includes a userType field to differentiate between service providers and customers

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      username: 'provider1',
      password: 'hashedpassword', // TODO: Hashing passwords functionality
      userType: 'provider', // or 'customer'
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
