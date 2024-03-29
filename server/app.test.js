import request from 'supertest';
import app from './app';

//testing register endpoint
describe("POST /register", () => {
    describe("given a username and password", () => { 
        //testing register page to make sure we get a response
        test('should respond with a 200 status', async () => {
            const response = await request(app)
                .post('/register')
                .send({username: 'username', password:'password'});
            expect(response.statusCode).toBe(200);
        });
        //testing register to make sure the username is in email format
        test('should respond valid username', async () => {
            const validUsername = "test@gmail.com";
            const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i; 
            const response = await request(app)
                .post('/register')
                .send({username: validUsername, password: 'password'});
           
            expect(response.body.username).toMatch(regex);
        });
        //testing register to make sure the password is valid
        test('should respond valid password', async () =>{
            const validPassword = "@testingCode9";
            const regex = /\s/;
            const response = await request(app)
                .post('/register')
                .send({username: 'username', password: validPassword});
            
            expect(response.body.password.length).toBeGreaterThanOrEqual(8); //length has to be greater than 8
            expect(response.body.password).toMatch(/[A-Z]/); //has a capital letter
            expect(response.body.password).toMatch(/[a-z]/); //has a lowercase letter
            expect(response.body.password).toMatch(/[0-9]/); //has a number
            expect(response.body.password).toMatch(/[\W_]/); //has special char
            expect(response.body.password).not.toMatch(regex); //has spaces
        });
    });
    describe("not given a username or password", () => {
        //should respond with a status code of 400
    });
});

//testing login endpoint


//testing profile endpoint
    // fullname, address1, address2, city, state, zip
describe("POST /profile", () => {
    describe("given a full name and full address", () => { 
        //testing profile page to make sure we get a response
        test('should respond with a 200 status', async () => {
            const response = await request(app)
                .post('/profile')
                .send({fullname: 'fullname', address1: 'address1', address2: '', city: "city", state: "state", zip: "zip"});
            expect(response.statusCode).toBe(200);
        });

        //testing profile to make sure the fullanme is valid
        test('should respond valid full name', async () => {
            const validfullname = "Test Testing";
            const regex = /([A-Z][a-z]{3,} )([A-Z][a-z]{3,} )?([A-Z][a-z]{3,})$/i; 
            const response = await request(app)
                .post('/profile')
                .send({fullname: validfullname, address1: 'address1', address2: 'idk', city: "city", state: "state", zip: "zip"});
           
            expect(response.body.fullname).toMatch(regex);
            expect(response.body.fullname.length).toBeLessThanOrEqual(50);
        });

        // testing profile to make sure address1 is valid
        test('should respond valid address1', async () =>{
            const validAddress1 = "1234 some rd";
            const regex = /^$/;
            const response = await request(app)
                .post('/profile')
                .send({fullname: 'full name', address1: validAddress1, address2: 'idk', city: "city", state: "state", zip: "zip"});
            
            expect(response.body.address1.length).toBeLessThanOrEqual(100); //length must be less than 100
            expect(response.body.address1).not.toMatch(regex); // must not be empty string
        });

        // testing profile to make sure address 2 is valid
        test('should respond valid address2', async () =>{
            const validAddress2 = "apt 123";
            // const regex = /^$/;
            const response = await request(app)
                .post('/profile')
                .send({fullname: 'full name', address1: 'address1', address2: validAddress2, city: "city", state: "state", zip: "zip"});
            
            expect(response.body.address2.length).toBeLessThanOrEqual(100); //length must be less than 100
        });

        // testing profile to make sure city is valid
        test('should respond valid city', async () =>{
            const validCity = "Houston";
            const regex = /^$/;
            const response = await request(app)
                .post('/profile')
                .send({fullname: 'full name', address1: 'address1', address2: 'address2', city: validCity, state: "state", zip: "zip"});
            
            expect(response.body.city.length).toBeLessThanOrEqual(100); //length must be less than 100
            expect(response.body.city).not.toMatch(regex); // cannot be empty string
        });

        // testing profile to make sure state is valid
        // FIX ME
        test('should respond valid state', async () =>{
            const validState = "TX";
            const regex = /AL|Alabama|AK|Alaska|AZ|Arizona|AR|Arkansas|CA|California|CO|Colorado|CT|Connecticut|DE|Delaware|FL|Florida|GA|Georgia|HI|Hawaii|ID|Idaho|IL|Illinois|IN|Indiana|IA|Iowa|KS|Kansas|KY|Kentucky|LA|Louisiana|ME|Maine|MD|Maryland|MA|Massachusetts|MI|Michigan|MN|Minnesota|MS|Mississippi|MO|Missouri|MT|Montana|NE|Nebraska|NV|Nevada|NH|New Hampshire|NJ|New Jersey|NM|New Mexico|NY|New York|NC|North Carolina|ND|North Dakota|OH|Ohio|OK|Oklahoma|OR|Oregon|PA|Pennsylvania|RI|Rhode Island|SC|South Carolina|SD|South Dakota|TN|Tennessee|TX|Texas|UT|Utah|VT|Vermont|VA|Virginia|WA|Washington|WV|West Virginia|WI|Wisconsin|WY|Wyoming/;
            const response = await request(app)
                .post('/profile')
                .send({fullname: 'full name', address1: 'address1', address2: 'address2', city: 'city', state: validState, zip: "zip"});
            
            // expect(response.body.city.length).toBeLessThanOrEqual(100); //length must be less than 100
            expect(response.body.state).toMatch(regex); // must match state abbreviation
            // expect(response.body.password).not.toMatch(regex); //has spaces
        });

        // testing profile to make sure zip is valid
        test('should respond valid zipcode', async () =>{
            const validZip = "11111";
            const regex = /^\d{5}(?:[-\s]\d{4})?$/;
            const response = await request(app)
                .post('/profile')
                .send({fullname: 'full name', address1: 'address1', address2: 'address2', city: 'city', state: 'state', zip: validZip});
            
            // expect(response.body.zip.length).toBeLessThanOrEqual(9); //length must be less than 9
            // expect(response.body.zip.length).toBeGreaterThanOrEqual(5); //length must be less than 5
            expect(response.body.zip).toMatch(regex); // must match zipcode formt
        });
    });
    describe("not given a name, address, city, state, or zip", () => {
        //should respond with a status code of 400
    });
});

/*
Full Name (50 characters, required)
    - Address 1 (100 characters, required)
    - Address 2 (100 characters, optional)
    - City (100 characters, required)
    - State (Drop Down, selection required) DB will store 2 character state code
    - Zipcode (9 characters, at least 5 character code required)
    */

//testing quote



//testing history