import request from 'supertest';
import handler from '../../app/pages/api/users';

describe('API Route: /api/users', () => {
  it('should create a new user', async () => {
    const res = await request(handler).post('/api/users').send({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password',
      isServiceProvider: false,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('$id');
    expect(res.body.username).toBe('testuser');
  });

  it('should return 405 for unsupported method', async () => {
    const res = await request(handler).get('/api/users');
    expect(res.statusCode).toBe(405);
  });
});
