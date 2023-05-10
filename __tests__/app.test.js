const app = require('../app');
const request = require('supertest');
const data = require('../db/data/test-data/index');
const seed = require('../db/seeds/seed');
const connection = require('../db/connection');
const endpoints = require('../endpoints.json');
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
    })
});

describe('/api', () => {
    test('GET - status: 200 - responds with a JSON object of the correct structure', () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then((response) => {                
            expect(response.headers['content-type']).toMatch('application/json');
            expect(response.body.endpoints).toEqual(endpoints);
            })
        });
    test('Responds with a JSON object containing properties of all available endpoints', () => {
        return request(app)             
        .get('/api')
        .expect(200)
        .then((response) => {
            expect(response.body.endpoints).toHaveProperty("GET /api");
            expect(response.body.endpoints).toHaveProperty("GET /api/categories");
            })            
        });
    test('Contains the correct properties for GET /api ', () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then((response) => {
            expect(response.body.endpoints['GET /api']).toHaveProperty("description");
        });
    });
    test('Contains the correct properties for GET /api/categories', () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then((response) => {
            expect(response.body.endpoints['GET /api/categories']).toHaveProperty("description");
            expect(response.body.endpoints['GET /api/categories']).toHaveProperty("queries");
            expect(response.body.endpoints['GET /api/categories']).toHaveProperty("exampleResponse");
        });
    });
});

