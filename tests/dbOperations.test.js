// tests/dbOperations.test.js
import { createUser, createService, createBooking, getBookingsForProvider } from '../services/dbOperations';

jest.mock('../services/dbOperations', () => ({
  createUser: jest.fn(),
  createService: jest.fn(),
  createBooking: jest.fn(),
  getBookingsForProvider: jest.fn(),
}));

describe('Database Operations', () => {
  let userId, serviceId, bookingId;

  beforeAll(() => {
    jest.clearAllMocks();
  });

  test('should create a new user', async () => {
    const user = { $id: '1', username: 'testuser', email: 'test@example.com', isServiceProvider: false };
    createUser.mockResolvedValue(user);
    const result = await createUser('testuser', 'test@example.com', 'password', false);
    userId = result.$id;
    expect(result).toHaveProperty('$id');
    expect(result.username).toBe('testuser');
  });

  test('should create a new service', async () => {
    const service = { $id: '1', providerId: userId, serviceName: 'Test Service', serviceDescription: 'Service Description', price: 100.0 };
    createService.mockResolvedValue(service);
    const result = await createService(userId, 'Test Service', 'Service Description', 100.0);
    serviceId = result.$id;
    expect(result).toHaveProperty('$id');
    expect(result.serviceName).toBe('Test Service');
  });

  test('should create a new booking', async () => {
    const booking = { $id: '1', serviceId, customerId: userId, bookingDate: '2024-07-10 14:00:00', status: 'Pending' };
    createBooking.mockResolvedValue(booking);
    const result = await createBooking(serviceId, userId, '2024-07-10 14:00:00', 'Pending');
    bookingId = result.$id;
    expect(result).toHaveProperty('$id');
    expect(result.status).toBe('Pending');
  });

  test('should get bookings for a provider', async () => {
    const bookings = [{ id: '1', providerId: userId, bookingDate: '2024-07-10 14:00:00', status: 'Pending' }];
    getBookingsForProvider.mockResolvedValue(bookings);
    const result = await getBookingsForProvider(userId);
    expect(Array.isArray(result)).toBe(true);
  });
});
