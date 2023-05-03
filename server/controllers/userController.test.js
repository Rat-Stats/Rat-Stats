const app = require('../server')
const request = require('supertest')(app);
const expect = require('chai').expect;
const assert = require('assert');
const express = require('express');
const User = require('../models/userModels')

describe('authentication test for ratsStats', () => {
  describe('creating account for new users (signup)', () => {
    it("POST request to correct /user/signup route with proper body creates user in the database", async () => {
      try {
        const response = await request
          .post("/user/signup")
          .send({username: "user2", password: "any"})
          .type("application/json");

        // findOne is based on mongoDB database, might need to change based on prisma db
        const foundUser = await User.findOne({username: "user2"});
        console.log(foundUser)
        expect(foundUser).to.exist;
      } catch (error) {
        throw error;
      }
    });
    it('Post request to to user/signup route with incorrect format or info does not create new account', async () => {
      try {
        const response = await request
          .post('/user/signup')
          .send({username:"user3"})
          .type('application/json')
        const foundUser = await User.findOne({username: "user3"});
      } catch (error) {
        expect(error).to.exist;
        throw error;
      }
    })
  });
});