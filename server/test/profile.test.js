import request from 'supertest'
import makeApp from '../app.js'
import { jest } from '@jest/globals'


// Bypass JWT verification by calling next()
const mockVerifyJWT = (req, res, next) => {
    next();
};

const app = makeApp({
    postClientProfile: jest.fn(),
    verifyJWT: mockVerifyJWT,
})

describe("POST /profile", () => {
    describe("given a user profile", () => { 
        //testing profile page to make sure we get a response
        test('should respond with a 200 status', async () => {
            const response = await request(app)
                .post('/profile')
                .send({fullname: 'fullname', address1: 'address1', address2: '', city: "city", state: "state", zip: "zip"});
            expect(response.statusCode).toBe(201);
        });

        //testing profile to make sure the fullanme is valid
        test('should respond valid full name', async () => {
            const validfullname = "Test Testing";
            const regex = /([A-Z][a-z]{3,} )([A-Z][a-z]{3,} )?([A-Z][a-z]{3,})$/i; 
            const response = await request(app)
                .post('/profile')
                .send({fullname: validfullname, address1: 'address1', address2: 'idk', city: "city", state: "state", zip: "zip", username: "devin@gmail.com"})
           
            expect(response.body.userProfile.fullname).toMatch(regex);
            expect(response.body.userProfile.fullname.length).toBeLessThanOrEqual(50);
        });

        // testing profile to make sure address1 is valid
        test('should respond valid addresses', async () =>{
            const validAddress1 = "1234 some rd";
            const regex = /^$/;
            const response = await request(app)
                .post('/profile')
                .send({fullname: 'full name', address1: validAddress1, address2: 'idk', city: "city", state: "state", zip: "zip"});
            
            expect(response.body.userProfile.address1.length).toBeLessThanOrEqual(100); //length must be less than 100
            expect(response.body.userProfile.address1).not.toMatch(regex); // must not be empty string
            expect(response.body.userProfile.address2.length).toBeLessThanOrEqual(100); //length must be less than 100
            expect(response.body.userProfile.address2).not.toMatch(regex); // must not be empty string
        });

        // testing profile to make sure city is valid
        test('should respond valid city', async () =>{
            const validCity = "Houston";
            const regex = /^$/;
            const response = await request(app)
                .post('/profile')
                .send({fullname: 'full name', address1: 'address1', address2: 'address2', city: validCity, state: "state", zip: "zip"});
            
            expect(response.body.userProfile.city.length).toBeLessThanOrEqual(100); //length must be less than 100
            expect(response.body.userProfile.city).not.toMatch(regex); // cannot be empty string
        });

        // testing profile to make sure state is valid
        // FIX ME
        test('should respond valid state', async () =>{
            const validState = "TX";
            const regex = /AL|Alabama|AK|Alaska|AZ|Arizona|AR|Arkansas|CA|California|CO|Colorado|CT|Connecticut|DE|Delaware|FL|Florida|GA|Georgia|HI|Hawaii|ID|Idaho|IL|Illinois|IN|Indiana|IA|Iowa|KS|Kansas|KY|Kentucky|LA|Louisiana|ME|Maine|MD|Maryland|MA|Massachusetts|MI|Michigan|MN|Minnesota|MS|Mississippi|MO|Missouri|MT|Montana|NE|Nebraska|NV|Nevada|NH|New Hampshire|NJ|New Jersey|NM|New Mexico|NY|New York|NC|North Carolina|ND|North Dakota|OH|Ohio|OK|Oklahoma|OR|Oregon|PA|Pennsylvania|RI|Rhode Island|SC|South Carolina|SD|South Dakota|TN|Tennessee|TX|Texas|UT|Utah|VT|Vermont|VA|Virginia|WA|Washington|WV|West Virginia|WI|Wisconsin|WY|Wyoming/;
            const response = await request(app)
                .post('/profile')
                .send({fullname: 'full name', address1: 'address1', address2: 'address2', city: 'city', state: validState, zip: "zip"});
            
            expect(response.body.userProfile.state.length).toEqual(2); //length must be less than 100
            expect(response.body.userProfile.state).toMatch(regex); // must match state abbreviation
        });

        // testing profile to make sure zip is valid
        test('should respond valid zipcode', async () =>{
            const validZip = "11111";
            const regex = /^\d{5}(?:[-\s]\d{4})?$/;
            const response = await request(app)
                .post('/profile')
                .send({fullname: 'full name', address1: 'address1', address2: 'address2', city: 'city', state: 'state', zipcode: validZip});
            
            expect(response.body.userProfile.zipcode.length).toBeLessThanOrEqual(9); //length must be less than 9
            expect(response.body.userProfile.zipcode.length).toBeGreaterThanOrEqual(5); //length must be less than 5
            expect(response.body.userProfile.zipcode).toMatch(regex); // must match zipcode formt
        });
    });
    describe("not given a name, address, city, state, or zip", () => {
        //should respond with a status code of 400
    });
});
