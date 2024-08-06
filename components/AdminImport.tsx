import React from 'react';
import BulkUserImport from './bulk-import/BulkUserImport';

const AdminCustomerUsers: React.FC = () => {
  const collectionId = process.env.CONSUMER_COLLECTION_ID!;

  return (
    <div>
      <BulkUserImport
      userType="Consumer"
      collectionId={process.env.CONSUMER_COLLECTION_ID!}
      defaultProfilePictureUrl="/assets/DefaultConsumerProfile.png"
    />
      <BulkUserImport
      userType="Provider"
      collectionId={process.env.SERVICEPROVIDER_COLLECTION_ID!}
      defaultProfilePictureUrl="/assets/DefaultProviderProfile.jpeg"
    />
    </div>
  );
};

export default AdminCustomerUsers;