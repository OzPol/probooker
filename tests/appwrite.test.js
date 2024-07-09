// tests/appwrite.test.js
import { client } from '@lib/appwrite';
import { expect } from '@jest/globals';

describe('Appwrite Client', () => {
  it('should connect to the Appwrite server with the provided endpoint and project ID', async () => {
    try {
      const response = await client.call('get', 'health', {
        headers: {
          'X-Appwrite-Project': '668b90240021a44136b3',
          'X-Appwrite-Key': '96a8787567c34f15ff2a9aa35c3fb4ddc1f20a334405057fe5864ada5938043107cd51f2024b1599fc0880bf9252ffb5b0b27f261c727c1ffb8e34f4ca8b71ae801b009946ff6ea34814bcf87e48bdf5fc7ef4905827848dad8cf72513a50d3818bc17605c3442948a53d2ad7086226458c47ddfe8187cd0749fac71f9d649d9'
        }
      });
      console.log('Appwrite response:', response);
      expect(response).toBeTruthy();
      expect(response).toHaveProperty('message');
    } catch (error) {
      console.error('Error connecting to Appwrite server:', error.message);
      console.error('Error details:', error.response?.data || error.response || error);
      throw new Error('Unable to connect to Appwrite server. Please check the endpoint and project ID.');
    }
  });
});
