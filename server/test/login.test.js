
import request from 'supertest'
import makeApp from '../app.js'
import { jest } from '@jest/globals'


const mockVerifyJWT = (req, res, next) => {
    next();
};

const app = makeApp({
    loginClient: jest.fn(),
    verifyJWT: mockVerifyJWT,
})

describe("POST /login", () => {
    describe("given a username and password", () => { 
        //testing login to make sure the username is in email format
        test('should respond valid username', async () => {
            const validUsername = "miguel@gmail.com";
            const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i; 
            const response = await request(app)
                .post('/login')
                .send({username: validUsername, password: '@Testing1'});
            expect(response.body.username).toMatch(regex);
        });
        //testing login to make sure the password is valid
        test('should respond valid password', async () =>{
            const validPassword = "@Testing1";
            const response = await request(app)
                .post('/login')
                .send({username: 'miguel@gmail.com', password: validPassword});
            expect(response.status).toBe(201);
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
        
    });
});
