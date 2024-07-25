// components/BookingForm.tsx

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { z } from 'zod';
import { getBookingSchema } from '../lib/validation';
import CustomFormField, { FormFieldType } from './CustomFormField';
import SubmitButton from './SubmitButton';
import { createBooking } from '../lib/booking.actions';

const BookingForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<ReturnType<typeof getBookingSchema>>>({
    resolver: zodResolver(getBookingSchema('create')),
    defaultValues: {
      service: '',
      date: new Date(),
      time: '',
    },
  });

  const onSubmit = async (values: z.infer<ReturnType<typeof getBookingSchema>>) => {
    try {
      await createBooking(values);
      router.push('/customerProfile'); // Redirect after booking
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <CustomFormField
        fieldType={FormFieldType.INPUT}
        control={form.control}
        name="service"
        label="Service"
        placeholder="Service"
      />
      <CustomFormField
        fieldType={FormFieldType.DATE_PICKER}
        control={form.control}
        name="date"
        label="Date"
        dateFormat="MM/dd/yyyy"
      />
      <CustomFormField
        fieldType={FormFieldType.INPUT}
        control={form.control}
        name="time"
        label="Time"
        placeholder="Time"
      />
      <SubmitButton isLoading={false}>Create Booking</SubmitButton>
    </form>
  );
};

export default BookingForm;
