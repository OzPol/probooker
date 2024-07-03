const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      username: 'MargeS',
      password: '87654321',
      userType: 'customer',
      name: 'Marge Simpson',
      email: 'MargeS@examplmmm.com',
      profilePicture: 'https://upload.wikimedia.org/wikipedia/en/0/0b/Marge_Simpson.png'
    },
  });
  console.log('User added');
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
