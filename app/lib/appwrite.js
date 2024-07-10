// app/lib/appwrite.js
import { Client, Databases, Account } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('668b90240021a44136b3'); // Replace with your Appwrite project ID

const databases = new Databases(client);
const account = new Account(client);

export { client, databases, account };
