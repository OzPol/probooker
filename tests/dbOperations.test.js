import { createUser, createService, createBooking, getBookingsForProvider } from '../app/services/dbOperations';

describe('Database Operations', () => {
  let userId, serviceId, bookingId;

  test('should create a new user', async () => {
    const user = await createUser('testuser', 'test@example.com', 'password', false);
    userId = user.$id;
    expect(user).toHaveProperty('$id');
    expect(user.username).toBe('testuser');
  });

  test('should create a new service', async () => {
    const service = await createService(userId, 'Test Service', 'Service Description', 100.0);
    serviceId = service.$id;
    expect(service).toHaveProperty('$id');
    expect(service.serviceName).toBe('Test Service');
  });

  test('should create a new booking', async () => {
    const booking = await createBooking(serviceId, userId, '2024-07-10 14:00:00', 'Pending');
    bookingId = booking.$id;
    expect(booking).toHaveProperty('$id');
    expect(booking.status).toBe('Pending');
  });

  test('should get bookings for a provider', async () => {
    const bookings = await getBookingsForProvider(userId);
    expect(Array.isArray(bookings)).toBe(true);
  });
});
