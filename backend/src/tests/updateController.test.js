const request = require('supertest');
const express = require('express');
const updateController = require('../controllers/updateController');

const app = express();
app.use(express.json());
app.get('/updates', updateController.listUpdates);

// Mock DB for test
jest.mock('../db', () => ({ sequelize: { define: jest.fn(), sync: jest.fn() } }));

// Example test
describe('GET /updates', () => {
  it('should return updates', async () => {
    const res = await request(app).get('/updates');
    expect(res.statusCode).toBe(200);
    // More assertions can be added here
  });
});
