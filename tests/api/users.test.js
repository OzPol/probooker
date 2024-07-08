import handler from '@app/pages/api/users';
import { createUser } from '@services/dbOperations';

jest.mock('@services/dbOperations', () => ({
  createUser: jest.fn(),
}));

describe('API Route: /api/users', () => {
  it('should create a new user', async () => {
    const user = { id: '1', username: 'testuser', email: 'test@example.com', password: 'password', isServiceProvider: false };
    createUser.mockResolvedValue(user);

    const req = { method: 'POST', body: { username: 'testuser', email: 'test@example.com', password: 'password', isServiceProvider: false } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(user);
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
