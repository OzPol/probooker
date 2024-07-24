// components/EnvCheck.tsx

import React from 'react';

const EnvCheck: React.FC = () => {
  return (
    <div>
      <p>Appwrite Endpoint: {process.env.ENDPOINT}</p>
      <p>Appwrite Project ID: {process.env.NEXT_PUBLIC_PROJECT_ID}</p>
      <p>Appwrite API Key: {process.env.API_KEY}</p>
    </div>
  );
};

export default EnvCheck;
