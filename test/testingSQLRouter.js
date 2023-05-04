const sqlRouter = require('../server/routes/sqlRouter');
const oaRouter = require('../server/routes/oaRouter.js');
const userRouter = require('../server/routes/userRouter.js');
const fs = require('fs');
const request = require('supertest');

describe('GET /profile/:username', () => {
    it('tests to see if status being passed is 200', async () => {
        const res = await request(sqlRouter).get('/profile/:username')
        expect(res.statusCode).toEqual(200);
    })
})

describe('GET /rat/:name', () => {
    it('tests to see if status being passed is 200', async () => {
        const res = await request(sqlRouter).get('/rat/:name')
        expect(res.statusCode).toEqual(200);
    })
})


describe('GET /sighting/:location', () => {
    it('tests to see if status being passed is 200', async () => {
        const res = await request(sqlRouter).get('/sighting/:location')
        expect(res.statusCode).toEqual(200);
    })
})

describe('GET /getsinglesighting', () => {
    it('tests to see if status being passed is 200', async () => {
        const res = await request(sqlRouter).get('/getsinglesighting')
        expect(res.statusCode).toEqual(200);
    })
})

describe('POST /getallsightings', () => {
    it('tests to see if status being passed is 200', async () => {
        const res = await request(sqlRouter).get('/getallsightings')
        expect(res.statusCode).toEqual(200);
    })
})

describe('POST /profile', () => {
    it('tests to see if status being passed is 200', async () => {
        const res = await request(sqlRouter).get('/profile')
        expect(res.statusCode).toEqual(200);
    })
})

describe('POST /rat', () => {
    it('tests to see if status being passed is 200', async () => {
        const res = await request(sqlRouter).get('/rat')
        expect(res.statusCode).toEqual(200);
    })
})

describe('POST /sighting', () => {
    it('tests to see if status being passed is 200', async () => {
        const res = await request(sqlRouter).get('/sighting')
        expect(res.statusCode).toEqual(200);
    })
})

describe('POST /addsighting', () => {
    it('tests to see if status being passed is 200', async () => {
        const res = await request(sqlRouter).get('/addsighting')
        expect(res.statusCode).toEqual(200);
    })
})







