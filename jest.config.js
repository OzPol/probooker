// jest.config.js
module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // If using ES modules and Babel
  },
};
