require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.post('/api/login', userController.login);

// Default route for testing
app.get('/', (req, res) => {
    res.send('Welcome to ProBooker Backend');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
