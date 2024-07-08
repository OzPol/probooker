const moduleAlias = require('module-alias');
const path = require('path');

moduleAlias.addAliases({
  '@app': path.join(__dirname, 'app'),
  '@services': path.join(__dirname, 'services'),
  '@tests': path.join(__dirname, 'tests'),
});
