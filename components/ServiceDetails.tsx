import React, {useState} from 'react';
import BookingForm from './BookingForm';
import AvailabilityCalendar from './AvailabilityCalendar';
import { Service} from '../types/appwrite.type';
interface ServiceDetailsProps {
  service: any;
  onBack: () => void;
}

const ServiceDetails: React.FC<ServiceDetailsProps> = ({ service, onBack }) => {
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [availableDates, setAvailableDates] = useState<Date[]>([
      // Mocked available dates
      new Date('2024-07-25'),
      new Date('2024-07-26'),
      new Date('2024-07-27'),
    ]);
  return (
    <div>

      <h2 className="text-2xl font-bold mb-2">{service.name}</h2>
      <p className="text-gray-700 mb-4">{service.description}</p>
      <p className="text-gray-600 italic">Provider: {service.providerName}</p>
      <p className="text-blue-500 font-bold">${service.price}</p>
      <div>
          <h2 className="text-2xl font-bold mb-4">Booking: {service.name}</h2>
          <p>{service.description}</p>
          <p>Provider: {service.providerName}</p>
          <p>Price: ${service.price}</p>
          <AvailabilityCalendar availableDates={availableDates} />
          <BookingForm />
          <button onClick={onBack} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Back to Search</button>
          {/* <button
            onClick={() => setSelectedService(null)}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Back to Search
          </button> */}
        </div>
    </div>
  );
};

export default ServiceDetails;




