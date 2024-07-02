const userService = require('../services/userService'); // Ensure the correct path is used

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('Login request:', username, password);
        const token = await userService.login(username, password);
        console.log('Generated token:', token);
        res.status(200).json({ token });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(401).json({ error: error.message });
    }
};
