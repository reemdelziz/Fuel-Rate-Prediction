import request from 'supertest'
import makeApp from '../app.js'
import { jest } from '@jest/globals'

const mockVerifyJWT = (req, res, next) => {
    next();
};
const getClientProfile = jest.fn();
const getPricingModule = jest.fn();
const generateQuote = jest.fn();
const getHistory = jest.fn();
const setPrevClient = jest.fn();

const app = makeApp({
    getClientProfile,
    getPricingModule,
    generateQuote,
    getHistory,
    setPrevClient,
    verifyJWT: mockVerifyJWT
});

describe("POST /fuel", () => {
    //testing quote page to make sure we get a response
    test('should respond with a 201 status', async () => {
        const response = await request(app)
            .post('/fuel/post/quote')
            .send({location: 'UH Drive 1234, Houston, TX 12345', gallons: 100, price_per_gallon: 2.50, delivery_date: '2024-04-23', total_price: 2500.00, profit_margin: 1.5, username: 'testing@gmail.com'});        
            expect(response.statusCode).toBe(201);
    });
    //testing quote to make sure gallonsRequested is a number
    test('should respond with a valid gallonsRequested', async () => {
        const response = await request(app)
            .post('/fuel/post/quote') 
            .send({location: 'UH Drive 1234, Houston, TX 12345', gallons: 100, price_per_gallon: 2.50, delivery_date: '2024-04-23', total_price: 2500.00, profit_margin: 1.5, username: 'testing@gmail.com'});        
        expect(typeof response.body.userQuote.gallons).toBe('number'); //is  a number
        expect(response.body.userQuote.gallons).toBeGreaterThan(0); //is greater than 0
    });
    //testing quote to make sure deliveryAddress is a string
    test('should respond with a valid deliveryAddress', async () => {
        const response = await request(app)
            .post('/fuel/post/quote') 
            .send({location: 'UH Drive 1234, Houston, TX 12345', gallons: 100, price_per_gallon: 2.50, delivery_date: '2024-04-23', total_price: 2500.00, profit_margin: 1.5, username: 'testing@gmail.com'});        
        expect(typeof response.body.userQuote.location).toBe('string'); //is a string
        expect(response.body.userQuote.location).toMatch(/^[a-zA-Z0-9\s,]+$/);

    });
    //testing quote to make sure deliveryDate is a date
    test('should respond with a valid deliveryDate', async () => {
        const response = await request(app)
            .post('/fuel/post/quote') 
            .send({location: 'UH Drive 1234, Houston, TX 12345', gallons: 100, price_per_gallon: 2.50, delivery_date: '2024-04-23', total_price: 2500.00, profit_margin: 1.5, username: 'testing@gmail.com'});        
        // Check if the deliveryDate in the response is a string and has the correct format
        expect(typeof response.body.userQuote.delivery_date).toBe('string'); // Checks if it's a string
        expect(response.body.userQuote.delivery_date).toMatch(/^\d{4}-\d{2}-\d{2}$/); // Checks for the format YYYY-MM-DD
        expect(response.body.userQuote.delivery_date).not.toMatch(/[^0-9-]/); // Ensures only numbers and hyphens are present
    });


});

describe("GET /history, /user, /state", () => {
    describe("GET /history", () => {
        test('should respond with a 200 status', async () => {
            const response = await request(app)
                .get('/fuel/history/devin@gmail.com')
                .send({username: 'devin@gmail.com'})
            expect(response.status).toBe(200)
        });
        test('should send valid username to get fuel history data', async () => {
            const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i; 
            const response = await request(app)
                .get('/fuel/history/devin@gmail.com')
                .send({username: 'devin@gmail.com'})
            expect(response.body.username).toMatch(regex);
        });
    })
    describe("GET /user", () => {
        test ('should respond with a 200 status', async () => {
            const response = await request(app)
                .get('/fuel/user/miguel@gmail.com');
            expect(response.status).toBe(201);
        });
    })
    describe("GET /state", () => {
        test ('should respond with a 200 status', async () => {
            const response = await request(app)
                .get('/fuel/state/TX');
            expect(response.status).toBe(201);
        });

    })
});



describe("PUT /client", () => {
    test("should respond with 200 status", async () => {
        const response = await request(app)
            .put('/fuel/put/client')
            .send({prevClient: 1, username: 'devin@gmail.com'})
        
    })
})