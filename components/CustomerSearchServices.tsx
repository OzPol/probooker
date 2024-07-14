import React, { useEffect, useState } from 'react';
import ServiceList from './DataServiceConsumer';

const CustomerSearchServices = () => {
    return (
      <div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Search Services</h2>
          <input
            type="text"
            placeholder="Search for services..."
            className="w-full p-2 border rounded mb-4"
          />
          <p>This is a placeholder for the customer search services section.</p>
        </div>
        <div className="mt-8">
          <ServiceList />
        </div>
      </div>
    );
  };
  
  export default CustomerSearchServices;
  