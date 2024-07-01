// pages/index.tsx
// This will serve as the homepage for the application

import React from 'react';
import Layout from '../components/Layout';

const Home: React.FC = () => {
  return (
    <Layout>
      <h1>Welcome to ProBooker</h1>
      <p>This is the homepage of ProBooker application.</p>
    </Layout>
  );
};

export default Home;
