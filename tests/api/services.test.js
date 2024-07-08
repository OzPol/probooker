import request from 'supertest';
import handler from '../../app/pages/api/services';

describe('API Route: /api/services', () => {
  it('should create a new service', async () => {
    const res = await request(handler).post('/api/services').send({
      providerId: 'provider_id_example',
      serviceName: 'Test Service',
      serviceDescription: 'Service Description',
      price: 100.0,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('$id');
    expect(res.body.serviceName).toBe('Test Service');
  });

  it('should return 405 for unsupported method', async () => {
    const res = await request(handler).get('/api/services');
    expect(res.statusCode).toBe(405);
  });
});
