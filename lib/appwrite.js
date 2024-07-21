// app/lib/appwrite.js
import { Client, Databases, Account } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('6699c732003ae43e9824'); // Replace with your Appwrite project ID

const databases = new Databases(client);
const account = new Account(client);

export { client, databases, account };
