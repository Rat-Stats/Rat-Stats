const userRouter = require('../server/routes/userRouter.js');
const fs = require('fs');
const request = require('supertest');

describe('GET /', () => {
    it('tests to see if status being passed is 200', async () => {
        const res = await request(sqlRouter).get('/')
        expect(res.statusCode).toEqual(200);
    })
})

describe('USE /signup', () => {
    it('tests to see if status being passed is 200', async () => {
        const res = await request(sqlRouter).get('/signup')
        expect(res.statusCode).toEqual(200);
        expect(res.headers.location).toContain(`http://localhost:8080/homepage`);
    })
})

describe('USE /login', () => {
    it('tests to see if status being passed is 200', async () => {
        const res = await request(sqlRouter).get('/login')
        expect(res.statusCode).toEqual(200);
    })
})