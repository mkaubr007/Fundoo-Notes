const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const faker = require("faker");

chai.use(chaiHttp);
const rabbitmqData = require("./rabbitmq.json");
const { expect } = require("chai");
const { string } = require("joi");
chai.should();
describe("rabbitmq_sucessShould_returnTrue ", () => {
  it("givenRegistrationDetails_whenProperConfirm_byMailshouldSaveInDB", (done) => {
    const registerfaker = {
      firstName: faker.name.findName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    chai
      .request(server)
      .post("/register")
      .send(registerfaker)
      .end((err, res) => {
        if (err) {
          return done(
            err,
            "Please check details again and re-enter the details with proper format"
          );
        }
        res.should.have.status(200);
        res.body.should.have.property("success").eql(true);
        res.body.should.have.property("message").eql("User Registered");
        done();
      });
  });
  it("givenLoginDetails_whenProperAndLinkVerified_shouldAbleToLogin", (done) => {
    const loginDetails = rabbitmqData.login;
    chai
      .request(server)
      .post("/login")
      .send(loginDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        res.body.should.have.property("success").eql(false);
        res.body.should.have
          .property("message")
          .eql("Unable to login. Please enter correct info");
        done();
      });
  });
});
