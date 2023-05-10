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


describe('/api/categories', () => {
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
});

describe('/api', () => {
    test('GET - status 200 - responds with a JSON object', () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then((response) => {                
            expect(response.headers['content-type']).toMatch('application/json');
            })
        });
    test('Responds with a JSON object containing properties of all available endpoints', () => {
        return request(app)             
        .get('/api')
        .expect(200)
        .then((response) => {
            expect(response.body).toHaveProperty("GET /api");
            expect(response.body).toHaveProperty("GET /api/categories");
            })            
        });
    test('Contains the correct properties for GET /api ', () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then((response) => {
            expect(response.body['GET /api']).toHaveProperty("description");
        });
    });
    test('Contains the correct properties for GET /api/categories', () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then((response) => {
            expect(response.body['GET /api/categories']).toHaveProperty("description");
            expect(response.body['GET /api/categories']).toHaveProperty("queries");
            expect(response.body['GET /api/categories']).toHaveProperty("exampleResponse");
        });
    });
    
});

// import json file
// type of 