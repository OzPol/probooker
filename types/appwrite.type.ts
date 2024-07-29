import { Models } from "node-appwrite";

export interface Consumer extends Models.Document {
  email: string; // Email type required
  phone: string; // String type required
  userId: string; // String type required
  name: string; // String type required
  address: string; // String type
  city: string; // String type
  state: string; // String type
  zipcode: string; // String type
  createon: Date; // Datetime type
  bookings: string[]; // Array of strings
  userType: 'Consumer'; // Enum type required
  profileImg: string; // URL type
}
export interface ServiceCardProps {
  title: string;
  summary: string;
  description: string;
  price: number;
  providerName: string;
  providerID: string;
  category: string;
  onClick?: () => void;
  onViewProfile?: () => void; // Optional prop for viewing profile
  onProviderClick?: () => void; // prop for provider click
}
export interface Service {
  $id: string;
  name: string;
  description: string;
  price: number;
  providerId: string;
  providerName: string;
  category: string;
  city: string;
  zipcode: string;
}
export interface Provider extends Models.Document {
  userId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  createdAt: Date;
  bookings: string[];
  ratings: Int8Array;
  userType: 'Provider';
  unavailableDates: string[];
  services: string[];
  profileImge: string;
}

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELED = 'canceled'
}

export interface Booking extends Models.Document {
  $id: string;
  consumerId: string;
  providerId: string;
  serviceId: string;
  schedule: Date;
  status: BookingStatus;
  reason: string;
  note: string;
  cancellationReason: string | null;
  createdAt: Date;
  updatedAt: Date;
}
export interface BookingCardProps {
  booking: Booking;
  onConfirm: () => void;
  onCancel: () => void;
}