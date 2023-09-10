import request from 'supertest';
import { app } from '../src/server/blockchainServer';
import { describe, test, expect, jest } from '@jest/globals';

jest.mock('../src/lib/blockchain');
jest.mock('../src/lib/block');

describe('BlockchainServer Tests', () => {
  test('GET /status - Should return status', async () => {
    const response = await request(app).get('/status');

    expect(response.status).toBe(200);
    expect(response.body.isValid.success).toBe(true);
  });

  test('GET /blocks/next - Should return next block', async () => {
    const response = await request(app).get('/blocks/next');

    expect(response.status).toBe(200);
    expect(response.body.index).toEqual(1);
  });

  test('POST /addblock - Should add a block', async () => {
    const response = await request(app)
      .post('/addblock')
      .send({ data: 'test' });

    expect(response.status).toBe(201);
    expect(response.body.block.index).toBe(1);
  });
});
