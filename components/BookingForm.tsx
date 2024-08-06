// ./components/BookingForm.tsx
import React, { useState, useEffect } from 'react';
import { databases } from '../lib/appwrite.config';
import { useRouter } from 'next/router';

interface BookingFormProps {
  providerId: string;
  serviceId: string;
  selectedDate: Date;
}

const BookingForm: React.FC<BookingFormProps> = ({ providerId, serviceId, selectedDate }) => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const router = useRouter();
  const consumerId = JSON.parse(localStorage.getItem('appwriteSession') || '{}').userId;

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const service = await databases.getDocument(
          process.env.DATABASE_ID!,
          process.env.SERVICE_COLLECTION_ID!,
          serviceId
        );
        setDiscount(service.price);
      } catch (error) {
        console.error('Error fetching service details:', error);
      }
    };

    fetchServiceDetails();
  }, [serviceId]);

  const handleCouponApply = async () => {
    if (coupon === '100OFF') {
      setDiscount(100);
    } else {
      setDiscount(0);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) {
      alert("Please select a date for booking.");
      return;
    }

    const formData = {
      date: selectedDate.toISOString(),
      consumerId,
      providerId,
      serviceId,
      status: 'pending',
      address,
      city,
      state,
      zipcode,
      discount
    };

    try {
      const response = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        router.push(`/payment-confirmation?bookingId=${responseData.bookingId}`);
      } else {
        console.error('Failed to create booking.');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="mt-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="text"
          value={selectedDate.toDateString()}
          readOnly
          className="mt-1 block w-1/2 sm:w-1/3 lg:w-1/4 border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div className="mt-2">
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mt-1 block w-1/2 sm:w-1/3 lg:w-1/4 border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>
      <div className="mt-2">
        <label className="block text-sm font-medium text-gray-700">City</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="mt-1 block w-1/2 sm:w-1/3 lg:w-1/4 border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>
      <div className="mt-2">
        <label className="block text-sm font-medium text-gray-700">State</label>
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="mt-1 block w-1/2 sm:w-1/3 lg:w-1/4 border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>
      <div className="mt-2">
        <label className="block text-sm font-medium text-gray-700">Zipcode</label>
        <input
          type="text"
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
          className="mt-1 block w-1/2 sm:w-1/3 lg:w-1/4 border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>
      <div className="mt-2">
        <label className="block text-sm font-medium text-gray-700">Coupon Code</label>
        <input
          type="text"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          className="mt-1 block w-1/2 sm:w-1/3 lg:w-1/4 border border-gray-300 rounded-md shadow-sm p-2"
        />
        <button
          type="button"
          onClick={handleCouponApply}
          className="ml-2 bg-green-500 text-white py-1 px-2 rounded"
        >
          Apply
        </button>
      </div>
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Book Now
      </button>
    </form>
  );
};

export default BookingForm;
