// inspired by AdrianHajdin's CardCard component
// https://github.com/adrianhajdin/project_next13_car_showcase/blob/main/components/CarCard.tsx
// a card component to display each service,
// which will be used in the services page to display services in a grid format

// import React from 'react';
// import { ServiceCardProps } from '../types/appwrite.type';

// const ServiceCard: React.FC<ServiceCardProps> = ({ title, summary, description, price, providerName, rating, providerID,category, onClick, onViewProfile, onProviderClick }) => {
//   return (
//     <div className="relative bg-white shadow-lg rounded-lg overflow-hidden m-4 p-4 flex flex-col justify-between">
//       <div onClick={onClick} className="cursor-pointer flex-grow">
//         <h2 className="text-lg font-bold mb-2">{title}</h2>
//         <p className="text-gray-700 mb-4">{summary}</p>
//         <div className="text-right mb-4">
//           <span className="text-blue-500 font-bold">${price}</span>
//         </div>
//       </div>
//       <p className="text-gray-600 italic cursor-pointer" onClick={onProviderClick}>Provider: {providerName}</p>
//       {onViewProfile && (
//         <button
//           onClick={onViewProfile}
//           className="absolute bottom-4 left-4 bg-blue-500 text-white py-2 px-4 rounded"
//         >
//           View Profile
//         </button>
//       )}
//     </div>
//   );
// };

// export default ServiceCard;

import React from 'react';
import { ServiceCardProps } from '../types/appwrite.type';

const ServiceCard: React.FC<ServiceCardProps> = ({ title, summary, description, price, providerName, providerID, category, city, providerIcon, rating, onClick, onViewProfile, onProviderClick }) => {
  return (
    <div className="relative bg-white shadow-lg rounded-lg overflow-hidden m-4 p-4 flex flex-col h-96 cursor-pointer">
      <div className="flex justify-between mb-2" onClick={onClick}>
        <div className="flex-grow">
          <h2 className="text-xl font-bold line-clamp-2">{title}</h2>
        </div>
        <div className="flex items-center">
          <span className="bg-green-100 text-black py-1 px-2 rounded">{"⭐"+rating}</span>
        </div>
      </div>
      <div className="mb-2" onClick={onClick}>
        <img src="https://img.freepik.com/premium-photo/male-hands-typing-computer-keyboard-service-concept_220873-10436.jpg" alt={title} className="w-full h-40 object-cover" />
      </div>
      <div className="mb-2 flex-grow" onClick={onClick}>
        <p className="text-gray-700 line-clamp-4">{summary}</p>
      </div>
      <div className="flex justify-between items-center mt-4"onClick={onClick}>
        <span className="text-gray-500">{city}</span>
        <div className="flex items-center">
          <p className="text-gray-600 italic cursor-pointer" onClick={onProviderClick}>Provider: {providerName}</p>
          <img src={providerIcon} alt={providerName} className="w-8 h-8 rounded-full mr-2" />
        </div>
      </div>
      {/* {onViewProfile && (
        <button
          onClick={onViewProfile}
          className="absolute bottom-4 left-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          View Profile
        </button>
      )} */}
    </div>
  );
};

export default ServiceCard;
