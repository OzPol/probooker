const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (username, password) => {
  const result = await db.query('SELECT * FROM users WHERE username = $1', [
    username,
  ]);
  const user = result.rows[0];

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid username or password');
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    'your_jwt_secret',
    { expiresIn: '1h' }
  );
  return token;
};
