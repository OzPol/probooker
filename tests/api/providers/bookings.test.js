import handler from '@app/pages/api/providers/bookings';
import { getBookingsForProvider } from '@services/dbOperations';

jest.mock('@services/dbOperations', () => ({
  getBookingsForProvider: jest.fn(),
}));

describe('API Route: /api/providers/:providerId/bookings', () => {
  it('should get bookings for a provider', async () => {
    const req = { method: 'GET', query: { providerId: 'test-provider' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    getBookingsForProvider.mockResolvedValueOnce([{ id: 1, status: 'Pending' }]);

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: 1, status: 'Pending' }]);
  });

  it('should return 405 for unsupported method', async () => {
    const req = { method: 'POST', query: { providerId: 'test-provider' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ error: 'Method Not Allowed' });
  });
});
