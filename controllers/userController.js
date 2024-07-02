const userService = require('../services/userService');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await userService.login(username, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
