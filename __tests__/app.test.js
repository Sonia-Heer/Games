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


describe('/api/categories', () => {
    test('GET - status 200 and responds with an array of categories', () => {
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

describe('/api/reviews', () => {
    test('GET - status: 200 - responds with an array of reviews', () => {
        return request(app)
        .get('/api/reviews')
        .expect(200)
        .then((response) => {             
            expect(Array.isArray(response.body.reviews)).toBe(true);
            expect(response.body.reviews.length).toBe(13);
            });
    });
    test('GET - status: 200 - contains the correct properties', () => {
        return request(app)
        .get('/api/reviews')
        .expect(200)
        .then((response) => {
            expect(response.body.reviews).toHaveLength(13);
            response.body.reviews.forEach((review) => {
                expect(review).toHaveProperty('review_id');
                expect(review).toHaveProperty('owner');
                expect(review).toHaveProperty('title');
                expect(review).toHaveProperty('category');
                expect(review).toHaveProperty('review_img_url');
                expect(review).toHaveProperty('created_at');
                expect(review).toHaveProperty('votes');
                expect(review).toHaveProperty('designer');
                expect(review).toHaveProperty('comment_count');
            });
        });
    });
    test('GET - status: 200 - contains the correct data type for each property', () => {
        return request(app)
        .get('/api/reviews')
        .expect(200)
        .then((response) => {
            expect(response.body.reviews).toHaveLength(13);
            response.body.reviews.forEach((review) => {
                expect(typeof review.review_id).toBe('number');
                expect(typeof review.owner).toBe('string');
                expect(typeof review.title).toBe('string');
                expect(typeof review.category).toBe('string');
                expect(typeof review.review_img_url).toBe('string');
                expect(typeof review.created_at).toBe('string');
                expect(typeof review.votes).toBe('number');
                expect(typeof review.designer).toBe('string');
                expect(typeof review.comment_count).toBe('number');
            });
        });
    });
    test('GET - status: 200 - sorts by date by default', () => {
        return request(app)
        .get('/api/reviews')
        .expect(200)
        .then((response) => {
            expect(response.body.reviews).toBeSortedBy('created_at');
        });
    });
    test('GET - status: 200 - can sort by valid column specified in query', () => {
        return request(app)
        .get('/api/reviews?sort_by=category')
        .expect(200)
        .then((response) => {
            expect(response.body.reviews).toBeSortedBy('category');
        });
    });
    test('GET - status: 400 - invalid sort criteria', () => {
        return request(app)
        .get("/api/reviews?sort_by=nonsense")
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe('Invalid sort query')
        });
    });
    test('GET - status: 200 - sorts by date in descending order', () => {
        return request(app)
        .get('/api/reviews?sort_by=created_at&order=desc')
        .expect(200)
        .then((response) => {
            expect(response.body.reviews).toBeSortedBy('created_at', { descending: true });
        });
    });
    test('GET - status: 400 - invalid order criteria', () => {
        return request(app)
        .get('/api/reviews?order=nonsense')
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe('invalid order query');
            });
    });
});

