const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);
const registrationData = require('./user.json');
const loginData = require('./user.json');
const userInputs = require('./user.json');
const inputData=require('./user.json');
const faker = require('faker');
const { expect } = require('chai');
const { string } = require('joi');

chai.should();

describe('registartion', () => {
  it('givenRegistrationDetails_whenProper_shouldSaveInDB', (done) => {
    const registerfaker = {
      firstName: faker.name.findName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };
    chai
      .request(server)
      .post('/register')
      .send(registerfaker)
      .end((err, res) => {
        if (err) {
          return done(err,"Please check details again and re-enter the details with proper format");
        }
        res.should.have.status(200);
        res.body.should.have.property('success').eql(true);
        res.body.should.have.property('message').eql('User Registered');
        done();
      });
  });
  it('givenRegistrationDetails_whenImpProper_shouldNotSaveInDB', (done) => {
    const registartionDetails = registrationData.user.registrationWithImproperDetails;
    chai
      .request(server)
      .post('/register')
      .send(registartionDetails)
      .end((err, res) => {
        if (err) {
          return done(err,"Please check details again and re-enter the details with proper format");
        }
        res.should.have.status(400);
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Wrong Input Validations');
        done();
      });
  });
  it('givenRegistrationDetails_withOut_email_shouldNotSaveInDB', (done) => {
    const registartionDetails = registrationData.user.registrationWithOutEmail;
    chai
      .request(server)
      .post('/register')
      .send(registartionDetails)
      .end((err, res) => {
        if (err) {
          return done(err,"Please check details again and re-enter the details with proper format");
        }
        res.should.have.status(400);
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Wrong Input Validations');
        done();
      });
  });
  it('givenRegistrationDetails_withOut_firstName_shouldNotSaveInDB', (done) => {
    const registartionDetails = registrationData.user.registrationWithOutfirstName;
    chai
      .request(server)
      .post('/register')
      .send(registartionDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Wrong Input Validations');
        done();
      });
  });
});

describe('login', () => {
  it('givenLoginDetails_whenProper_shouldAbleToLogin', (done) => {
    const loginDetails = loginData.user.login;
    chai
      .request(server)
      .post('/login')
      .send(loginDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        res.body.should.have.property('success').eql(true);
        res.body.should.have.property('message').eql('User logged in successfully');
        done();
      });
  });
  it('givenLoginDetails_whenImproper_shouldUnableToLogin', (done) => {
    const loginDetails = loginData.user.loginWithImproperDetails;
    chai
      .request(server)
      .post('/login')
      .send(loginDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Unable to login. Please enter correct info');
        done();
      });
  });
});

describe('forgotPassword', () => {
  it('givenValidData_whenProper_souldAbleToSendEmailToUserEmail', (done) => {
    const forgotPasswordDetails = userInputs.user.ForgotPasswordPos;
    chai.request(server)
      .post('/forgotPassword')
      .send(forgotPasswordDetails)
      .end((error, res) => {
        if (error) {
          return done('Invalid details received instead of valid',error);
        }
        res.should.have.status(200);
        res.body.should.have.property('success').eql(true);
        res.body.should.have.property('message').eql('Email sent successfully');
        return done();
      });
  });
  it('givenInValidEmail_shouldNotAbleToSendEmailToUserEmail', (done) => {
    const forgotPasswordDetails = userInputs.user.ForgotPasswordNegNonRegistered;
    chai.request(server)
      .post('/forgotPassword')
      .send(forgotPasswordDetails)
      .end((error, res) => {
        if (error) {
          return done('email-id is empty or unable to fetch details');
        }
        res.should.have.status(400);
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Wrong Input Validations');
        done();
      });
  });
});

describe('reset Password API', () => {
  it('givenresetdetails_whenproper_shouldberesetlinkSent', (done) => {
    const reset = inputData.user.validDetails;
    chai
      .request(server)
      .put('/reset-Password')
      .send(reset)
      .end((error, res) => {
        res.should.have.status(200);
        res.body.should.have.property('success').eql(true);
        res.body.should.have.property('message').eql('Password reset succesfully');
        done();
      });
  });

  it('givenresetdetails_whenNotproper_shouldberesetlinkSent', (done) => {
    const reset = inputData.user.invalidDetails;
    chai
      .request(server)
      .put('/reset-Password')
      .send(reset)
      .end((error, res) => {
        res.should.have.status(422);
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Invalid password');
        done();
      });
  });

});

