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


//testing quote



//testing history