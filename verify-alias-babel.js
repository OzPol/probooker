require('@babel/register');
require('./module-alias');

try {
  require('@pages/api/providers/bookings');
  require('@services/dbOperations');
  console.log('Module aliasing is working correctly.');
} catch (error) {
  console.error('Error resolving modules:', error);
}
