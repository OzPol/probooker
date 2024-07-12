import * as sdk from 'node-appwrite';

export const {
    PROJECT_ID,
    API_KEY,
    DATABASE_ID,
    CONSUMER_COLLECTION_ID,
    SERVICEPROVIDER_COLLECTION_ID,
    ADMIN_COLLECTION_ID,
    SERVICE_COLLECTION_ID,
    BOOKING_COLLECTION_ID,
    REVIEW_COLLECTION_ID,
    NEXT_PUBLIC_BUCKET_ID:BUCKET_ID,
    NEXT_PUBLIC_ENDPOINT:ENDPOINT
} = process.env;

const client = new sdk.Client();

client
    .setEndpoint(ENDPOINT!)
    .setProject(PROJECT_ID!)
    .setKey(API_KEY!);

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const functions = new sdk.Functions(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);



