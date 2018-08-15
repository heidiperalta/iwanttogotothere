//'use strict';
require("dotenv").config({ path: "variables.env" });

const mongoose = require('mongoose');
const request = require("supertest");

const User = require('../api/models/user').User;
const user = {
  name: "Delete me",
  email: "delete.me@email.com",
  password: "test"
};

before( async () => {
  await mongoose.connect(process.env.DB);
  await User.remove({email: 'valid@email.com'});
});

after(done => done());

describe("User Resitration", () => {

  const registerCall = payload => {
    return request(process.env.BASE_URL)
      .post('/auth/register')
      .send(payload)
      .set('Accept', 'application/json');
  }

  it("Should ask for name", (done) => {
    registerCall({ email: 'test@email.com' })
      .expect( response => {
        if (!response.body.messages.includes('Name is required')) {
          throw new Error('Missing name validation');
        }
      }).end(done);
  });

  it("Should ask for email", (done) => {
    registerCall({ name: 'Test' })
      .expect( response => {
        if (!response.body.messages.includes('Email cannot be blank')) {
          throw new Error('Missing email validation');
        }
      }).end(done);
  });

  it("Should ask for valid email", (done) => {
    registerCall({ email: 'invalid', name: 'valid name'})
      .expect( response => {
        if (!response.body.messages.includes('Please provide a valid Email Address')) {
          throw new Error('Missing email format validation');
        }
      }).end(done);
  });

  it("Should ask for a password", (done) => {
    registerCall({ email: 'valid@email.com', name: 'valid name'})
      .expect( response => {
        if (!response.body.messages.includes('Password is required')) {
          throw new Error('Missing password validation');
        }
      }).end(done);
  });
  
  it("Password should at least be 6 characters long", (done) => {
    registerCall({ email: 'valid@email.com', name: 'valid name', password: '12345'})
      .expect( response => {
        if (!response.body.messages.includes('Password should at least be 6 characters long')) {
          throw new Error('Missing password length validation');
        }
      }).end(done);
  });
  
  it("Should ask for a password confirmation", (done) => {
    registerCall({ email: 'valid@email.com', name: 'valid name', password: 'abc123'})
      .expect( response => {
        if (!response.body.messages.includes('A Password Confirmation must be provided')) {
          throw new Error('Missing password confirmation validation');
        }
      }).end(done);
  });

  it("Password and Password Confirmation should match", (done) => {
    registerCall({ email: 'valid@email.com', name: 'valid name', password: 'abc123', passwordConfirmation: '123'})
      .expect( response => {
        
        if (!response.body.messages.includes('The Password and Confirmation do not match')) {
          throw new Error('Missing password and confirmation match validation');
        }
      }).end(done);
  });

  it("Should register the user!", (done) => {
    registerCall({ email: 'valid@email.com', name: 'valid name', password: 'abc123', passwordConfirmation: 'abc123'})
      .expect( response => {
        if (response.status !== 200) {
          throw new Error('The User failed to register');
        }
      }).end(done);
  });

  it("Email should be unique", (done) => {
    registerCall({ email: 'valid@email.com', name: 'valid name', password: 'abc123', passwordConfirmation: 'abc123'})
      .expect( response => {
        if (!response.body.messages.includes('An account with this email already exists, forgot password?')) {
          throw new Error('Unique email validation fails');
        }
      }).end(done);
  });

});
