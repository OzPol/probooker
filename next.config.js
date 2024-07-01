const path = require('path'); // path alias

module.exports = {
  // Environment variables
  // This allows us to access process.env.API_URL in our application code.
  // We can define our API URL in the environment variables or fallback to 'http://localhost:3000/api'
  env: {
    API_URL: process.env.API_URL || 'http://localhost:3000/api',
  },

  // Custom Webpack configuration

  webpack: (config, { isServer }) => {
    // Path aliases
    // This simplifies imports in the code.
    // Instead of writing import Header from '../../components/Header';,
    // we can write import Header from '@components/Header';
    config.resolve.alias['@components'] = path.join(__dirname, 'components');
    config.resolve.alias['@lib'] = path.join(__dirname, 'lib');
    config.resolve.alias['@utils'] = path.join(__dirname, 'utils');

    // Ensure fs module (which is used in Node.js but now in browser)
    // is not included in the client-side bundle
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    return config;
  },
};
