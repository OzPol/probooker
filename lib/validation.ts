// lib/validation.ts

import { z } from 'zod';

export const BookingSchema = z.object({
  service: z.string().nonempty('Service is required'),
  date: z.date(),
  time: z.string().nonempty('Time is required'),
});

export function getBookingSchema(type: string) {
  switch (type) {
    case 'create':
      return BookingSchema;
    default:
      return BookingSchema;
  }
}
