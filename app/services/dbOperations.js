// app/services/dbOperations.js
//CRUD operations using appwrite
import { databases } from '../lib/appwrite';

//These ID's come from appwrite website. 

//Database
const databaseId = 'probooker_appwrite_DB'; 

//Collections
const usersCollectionId = '668b918b002a7ea7d8ee'; 
const servicesCollectionId = '668b919300130fc78440'; 
const bookingsCollectionId = '668b919f002ca1810a67'; 

// Create a new user
async function createUser(username, email, password, isServiceProvider) {
  const result = await databases.createDocument(databaseId, usersCollectionId, 'unique()', {
    username,
    email,
    password,
    isServiceProvider,
  });
  return result;
}

// Create a new service
async function createService(providerId, serviceName, serviceDescription, price) {
  const result = await databases.createDocument(databaseId, servicesCollectionId, 'unique()', {
    providerId,
    serviceName,
    serviceDescription,
    price,
  });
  return result;
}

// Create a new booking
async function createBooking(serviceId, customerId, bookingDate, status) {
  const result = await databases.createDocument(databaseId, bookingsCollectionId, 'unique()', {
    serviceId,
    customerId,
    bookingDate,
    status,
  });
  return result;
}

// Get all bookings for a service provider
async function getBookingsForProvider(providerId) {
  const result = await databases.listDocuments(databaseId, bookingsCollectionId, [
    Query.equal('providerId', providerId),
  ]);
  return result.documents;
}

export {
  createUser,
  createService,
  createBooking,
  getBookingsForProvider,
};
