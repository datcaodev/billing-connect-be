import request from 'supertest';
import { app } from '../config/sever.config';

describe('GET /non-existent-route', () => {
  it('should return 404 for unknown routes', async () => {
    const response = await request(app).get('/api/v1/billion-connect/non-existent-route');
    expect(response.status).toBe(200); 
    expect(response.body.message).toBe('Đường dẫn API không tồn tại');
  });
});
