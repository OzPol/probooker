import request from 'supertest';
import handler from '../../../app/pages/api/providers/[providerId]/bookings';

describe('API Route: /api/providers/:providerId/bookings', () => {
  it('should get bookings for a provider', async () => {
    const res = await request(handler).get('/api/providers/provider_id_example/bookings');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return 405 for unsupported method', async () => {
    const res = await request(handler).post('/api/providers/provider_id_example/bookings');
    expect(res.statusCode).toBe(405);
  });
});
