const app = require('../app');
const request = require('supertest');
const data = require('../db/data/test-data/index');
const seed = require('../db/seeds/seed');
const connection = require('../db/connection');

beforeEach(() => {
    return seed(data);
});

afterAll(() => {
    return connection.end();
});


describe.only('/api/categories', () => {
    test('GET - status 200', () => {
        return request(app)
            .get('/api/categories')
            .expect(200)
            .then((response) => {
                expect(response.body.length).toBe(4);
            });
    });
    test('Check that all required columns are returned', () => {
        return request(app)
        .get('/api/categories')
        .expect(200)
        .then((response) => {
            response.body.forEach((category) => {
                expect(typeof category.slug).toBe('string');
                expect(typeof category.description).toBe('string');
            });
        });
    })
})