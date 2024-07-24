import { Client, Account } from 'appwrite';

const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite Endpoint
  .setProject(process.env.PROJECT_ID!!); // Your Project ID

const account = new Account(client);

export { client, account };




