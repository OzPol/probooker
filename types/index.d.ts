/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
    params: { [key: string]: string };
    searchParams: { [key: string]: string | string[] | undefined };
};
  
declare type Status = "pending" | "confirmed" | "cancelled";
  
declare interface CreateUserParams {
  name: string;
  email: string;
  phone: string;
}
declare interface User extends CreateUserParams {
  $id: string;
}
  
declare interface RegisterUserParams extends CreateUserParams {
  userName: string;
  address: string;
}
  
  declare type CreateAppointmentParams = {
    userId: string;
    patient: string;
    schedule: Date;
    status: Status;
    note: string | undefined;
  };
  
  declare type UpdateBookingParams = {
    BookingId: string;
    userId: string;
    Booking: Booking;
    type: string;
  };