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
            const response = await request(app)
                .post('/register')
                .send({username: 'username', password: validPassword});
            
            expect(response.body.password.length).toBeGreaterThanOrEqual(8); //length has to be greater than 8
            expect(response.body.password).toMatch(/[A-Z]/); //has a capital letter
            expect(response.body.password).toMatch(/[a-z]/); //has a lowercase letter
            expect(response.body.password).toMatch(/[0-9]/); //has a number
            expect(response.body.password).toMatch(/[\W_]/); //has special char
            expect(response.body.password).not.toMatch(/\s/); //has spaces
        });
        //testing if username doesn't exist in our db
    });
    describe("not given a username or password", () => {
        //should respond with a status code of 400
    });
});

//testing login endpoint
describe("POST /login", () => {
    describe("given a username and password", () => { 
        //testing login to make sure the username is in email format
        test('should respond valid username', async () => {
            const validUsername = "test@gmail.com";
            const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i; 
            const response = await request(app)
                .post('/login')
                .send({username: validUsername, password: '@testingCode9'});
           
            expect(response.body.username).toMatch(regex);
        });
        //testing login to make sure the password is valid
        test('should respond valid password', async () =>{
            const validPassword = "@testingCode9";
            const response = await request(app)
                .post('/login')
                .send({username: 'username', password: validPassword});
            
            expect(response.statusCode).toBe(200);
        });
    });
    
    describe("testing exception behavior", () => {
        //should respond with a status code of 400
        test('not given username receive 400', async () =>{
            const response = await request(app)
                .post('/login')
                .send({password: "@testingCode9"});
            expect(response.status).toBe(400);
        });
        test('not given password receive 400', async () =>{
            const response = await request(app)
                .post('/login')
                .send({username: 'username'});
            expect(response.status).toBe(400);
        });
        test('not given valid password receive 400', async () =>{
            const response = await request(app)
                .post('/login')
                .send({password: "@testingCode"});
            expect(response.status).toBe(400);
        });
    });
});



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




//testing history