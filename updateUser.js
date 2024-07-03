const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const updatedUser = await prisma.user.update({
    where: { username: 'Homer Simpson' },
    data: {
      username: 'HomerS',
      password:'12345678',
      name: 'Homer Simpson',
      email: 'HomerS@Simpsonsxxxx.com',
      profilePicture: 'https://upload.wikimedia.org/wikipedia/en/0/02/Homer_Simpson_2006.png',
    },
  });
  console.log('User updated:', updatedUser);
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
