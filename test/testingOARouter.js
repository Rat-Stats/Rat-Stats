const fs = require('fs');
const request = require('supertest');
const oaRouter = require('../server/routes/oaRouter.js');

describe('USE /login', () => {
    it('tests to see if status being passed is 200', async () => {
        const res = await request(sqlRouter).get('/login')
        expect(res.statusCode).toEqual(200);
        expect(res.headers.location).toContain(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&state=${STATE}`);
    })
})

describe('USE /isloggedin', () => {
    it('tests to see if status being passed is 200', async () => {
        const res = await request(sqlRouter).get('/isloggedin')
        expect(res.statusCode).toEqual(200);
        expect(res.headers.location).toContain(`http://localhost:8080/`);
    })
})

