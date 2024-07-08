// utils/appwrite.js
import { Client, Account } from 'appwrite';

const client = new Client();
client
  .setEndpoint('https://[YOUR_APPWRITE_ENDPOINT]') // Your Appwrite endpoint
  .setProject('[YOUR_PROJECT_ID]'); // Your Appwrite project ID

const account = new Account(client);

export { client, account };
