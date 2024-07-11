const moduleAlias = require('module-alias');
const path = require('path');

moduleAlias.addAliases({
  '@app': path.join(__dirname, 'app'),
  '@components': path.join(__dirname, 'components'),
  '@lib': path.join(__dirname, './lib'),
  '@pages': path.join(__dirname, 'pages'),
  '@services': path.join(__dirname, 'services'),
  '@tests': path.join(__dirname, 'tests'),
});
