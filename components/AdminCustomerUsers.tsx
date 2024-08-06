import React from 'react';
import ShowCollection from '../components/AdminShowCollection';

const AdminCustomerUsers: React.FC = () => {
  const collectionId = process.env.CONSUMER_COLLECTION_ID!;

  return (
    <div>
      <h1>Customer Users</h1>
      <ShowCollection collectionId={collectionId} />
    </div>
  );
};

export default AdminCustomerUsers;
