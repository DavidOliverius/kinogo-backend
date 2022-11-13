// import the server
const mongoose = require('mongoose');
const request = require('supertest');
const { app } = require('../src/server');

//establish a connection to the database
const { databaseConnector, databaseDisconnector } = require('../src/database');
const DATABASE_URI =
  process.env.DATABASE_URI || 'mongodb://localhost:27017/KinogoTest';

//before all tests, connect to the database
beforeAll(async () => {
  await databaseConnector(DATABASE_URI);
});

//after all tests, disconnect from the database
afterAll(async () => {
  await mongoose.disconnect();
});

//test the GET / route
describe('GET /', () => {
  it('should return a 200 status code', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toEqual(expect.stringContaining('Hello'));
  });
});

//test the GET /blogs route
describe('GET /blogs', () => {
  it('should return a 200 status code', async () => {
    const response = await request(app).get('/blogs');
    expect(response.statusCode).toBe(200);
  });
});

//test the POST /blogs route
describe('POST /blogs', () => {
  it('should return a 200 status code', async () => {
    const response = await request(app).post('/blogs');
    expect(response.statusCode).toBe(200);
  });
});