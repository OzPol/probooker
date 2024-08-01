import React from 'react';
import BulkUserImport from './bulk-import/BulkImportCustomerUsers';

const AdminCustomerUsers: React.FC = () => {
  const collectionId = process.env.CONSUMER_COLLECTION_ID!;

  return (
    <div>
      <h1>Import Users</h1>
      <BulkUserImport/>
    </div>
  );
};

export default AdminCustomerUsers;