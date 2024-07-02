const bcrypt = require('bcryptjs');

const hashPassword = async (plaintextPassword) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(plaintextPassword, saltRounds);
  console.log(hashedPassword);
};

hashPassword('your_password'); // Replace 'your_password' with the password you want to hash
