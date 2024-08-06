import React, { useState, useEffect } from 'react';
import { databases } from '../lib/appwrite.config';

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

  const handleCouponApply = async () => {
    if (coupon === '100OFF') {
      setDiscount(100);
    } else {
      setDiscount(0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const session = JSON.parse(localStorage.getItem('appwriteSession') || '{}');
    const consumerId = session.userId;

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
      discount,
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
        console.log('Booking created successfully.');
        window.location.href = `/payment-confirmation?bookingId=${responseData.bookingId}`;
      } else {
        console.error('Failed to create booking.');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Selected Date</label>
        <input
          type="text"
          value={selectedDate.toDateString()}
          className="mt-1 block w-1/2 sm:w-1/3 lg:w-1/4 border border-gray-300 rounded-md shadow-sm p-2"
          readOnly
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
