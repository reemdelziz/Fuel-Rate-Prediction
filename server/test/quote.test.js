import request from 'supertest';
import app from '../app';

describe("POST /quote", () => {
    //testing quote page to make sure we get a response
    test('should respond with a 200 status', async () => {
        const response = await request(app)
            .post('/quote')
            .send({gallonsRequested: 100, deliveryAddress: '1234 Test St', deliveryDate: '2021-01-01'});
        expect(response.statusCode).toBe(200);
    });
    //testing quote to make sure gallonsRequested is a number
    test('should respond with a valid gallonsRequested', async () => {
        const validGallonsRequested = 100;
        const response = await request(app)
            .post('/quote') 
            .send({ gallonsRequested: validGallonsRequested, deliveryAddress: '1234 Test St', deliveryDate: '2021-01-01' }); // Ensure field names match those expected by your API
        expect(typeof response.body.gallonsRequested).toBe('number'); //is  a number
        expect(response.body.gallonsRequested.toString()).not.toMatch(/[a-z]/);// doesnt have any letters
        expect(response.body.gallonsRequested.toString()).not.toMatch(/[A-Z]/); //doesnt have any capital letters
        expect(response.body.gallonsRequested).toBeGreaterThan(0); //is greater than 0
        expect(response.body.gallonsRequested.toString()).not.toMatch(/[\W_]/); //doesnt have any special characters
        expect(response.body.gallonsRequested.toString()).not.toMatch(/\s/); //doesnt have any spaces
    });
    //testing quote to make sure deliveryAddress is a string
    test('should respond with a valid deliveryAddress', async () => {
        const validDeliveryAddress = '1234 Test St';
        const response = await request(app)
            .post('/quote') 
            .send({ gallonsRequested: 100, deliveryAddress: validDeliveryAddress, deliveryDate: '2021-01-01' }); // Ensure field names match those expected by your API
        expect(typeof response.body.deliveryAddress).toBe('string'); //is a string
        expect(response.body.deliveryAddress).toMatch(/[a-z]/i); //has letters
        expect(response.body.deliveryAddress).not.toMatch(/[^a-zA-Z0-9 ]/); // Allow letters, numbers, and spaces, if not then it will fail

    });
    //testing quote to make sure deliveryDate is a date
    test('should respond with a valid deliveryDate', async () => {
        const validDeliveryDate = '2021-01-01';
        const response = await request(app)
            .post('/quote') 
            .send({ gallonsRequested: 100, deliveryAddress: '1234 Test St', deliveryDate: validDeliveryDate }); // Ensure field names match those expected by your API
        // Check if the deliveryDate in the response is a string and has the correct format
        expect(typeof response.body.deliveryDate).toBe('string'); // Checks if it's a string
        expect(response.body.deliveryDate).toMatch(/^\d{4}-\d{2}-\d{2}$/); // Checks for the format YYYY-MM-DD
        expect(response.body.deliveryDate).not.toMatch(/[^0-9-]/); // Ensures only numbers and hyphens are present
    });


});
