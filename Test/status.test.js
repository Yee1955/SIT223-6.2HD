// Import the dependencies
const expect = require('chai').expect;
const request = require('supertest');
const express = require('express');

// Setup the Express app for testing
const app = express();

// Sample route for demonstration
app.get('/api/status', (req, res) => {
    res.status(200).json({ status: 'success', message: 'API is running' });
});

// Start testing
describe('GET /api/status', () => {
    it('should return API status', (done) => {
        request(app)
            .get('/api/status')
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal('success');
                expect(res.body.message).to.equal('API is running');
                done(); // complete the test
            });
    });
});