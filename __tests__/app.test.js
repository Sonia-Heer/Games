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
    test('GET - status 200 and responds with an array of objects', () => {
        return request(app)
            .get('/api/categories')
            .expect(200)
            .then((response) => {
                expect(Array.isArray(response.body)).toBe(true);
                expect(response.body.length).toBe(4);
            });
    });
    test('Should contain the correct properties', () => {
        return request(app)
        .get('/api/categories')
        .expect(200)
        .then((response) => {
            expect(response.body).toHaveLength(4);
            response.body.forEach((category) => {
                expect(category).toHaveProperty('slug');
                expect(category).toHaveProperty('description');
            });
        });
    });
    test('Check that all required columns are returned', () => {
        return request(app)
        .get('/api/categories')
        .expect(200)
        .then((response) => {
            expect(response.body).toHaveLength(4);
            response.body.forEach((category) => {
                expect(typeof category.slug).toBe('string');
                expect(typeof category.description).toBe('string');
            });
        });
    });
});

