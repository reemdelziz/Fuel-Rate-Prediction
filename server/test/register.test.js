import request from 'supertest';
import app from '../app';

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