import request from 'supertest';
import app from './app';

describe("POST /register", () => {
    describe("given a username and password"), () => {
        //should be a valid username
        //should be a valid password
        //should respond with 200 status
        //should specify json in the content type header

    }
    describe("not given a username or password"), () => {
        //should respond with a status code of 400
    }
})
