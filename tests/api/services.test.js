import handler from '@pages/api/services';
import { createService } from '@services/dbOperations';

jest.mock('@services/dbOperations', () => ({
  createService: jest.fn(),
}));

describe('API Route: /api/services', () => {
  it('should create a new service', async () => {
    const service = { id: '1', providerId: '1', serviceName: 'Test Service', serviceDescription: 'Service Description', price: 100.0 };
    createService.mockResolvedValue(service);

    const req = { method: 'POST', body: { providerId: '1', serviceName: 'Test Service', serviceDescription: 'Service Description', price: 100.0 } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(service);
  });

  it('should return 405 for unsupported method', async () => {
    const req = { method: 'GET' };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ error: 'Method Not Allowed' });
  });
});
