const app = require('../server/server')
const request = require('supertest')(app);
const expect = require('chai').expect;
const assert = require('assert');
const express = require('express');
const User = require('../server/models/userModels')

// notes
// Test for login and signup. 
// Doesn't test for redirecting page because the logics are done in the front end
// all fetch request are async so we need to use await astnc

describe('testing server routes', () => {
  describe('creating account for new users (signup)', () => {
    it("POST request to correct /user/signup route with proper body creates user in the database", async () => {
      const response = await request
        .post("/user/signup")
        .send({username: "user2", password: "any"})
        .type("application/json");
      const foundUser = await User.findOne({username: "user2"});
      //we are expecting to recieve an account back with same username
      expect(foundUser).to.exist;

    });
    it('Post request to to user/signup route with incorrect format or info does not create new account', async () => {
      const response = await request
        .post('/user/signup')
        .send({username:"user5"})
        .type('application/json')
      const foundUser = await User.findOne({username: "user5"});
      //findOne method returns null whne nothing is found
      expect(foundUser).to.eql(null);
      
    })
  });
  describe('verifying already existing users (login)', () => {
    it('Post request to /user/login with correct info and format returns a response', async () => {
      try {
        const response = await request
          .post('/user/login')
          .send({username:'user1', password:'any'})
          .type('application/json')
        expect(response).to.exist;
      } catch (error) {
        throw error;
      }
    });
    // it('Post request to /user/login with incorrect info and format returns error', async () => {
    //   try {
    //     const response = await request
    //       .post('/user/login')
    //       .send({username:'user1'})
    //       .type('application/json')
    //   } catch (error) {
    //     expect(error).to.exist;
    //     throw error;
    //   }
    // })
  })
});