const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const faker = require("faker");

chai.use(chaiHttp);
const { expect } = require("chai");
const { string } = require("joi");
chai.should();
describe("rabbitmq_sucessShould_returnTrue ", () => {
  it("givendetails_whenproper_shouldbesendlink", (done) => {
    chai
      .request(server)
      .get("/confirmregister/:token")
      .send({ token: "req.params.token" })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it("givendetails_whenNotproper_shouldNotbesendlink", (done) => {
    chai
      .request(server)
      .get("/confirmregister/")
      .send({ token: "req.params.token" })
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
  it("givendetails_whenNotproper_shouldNotbesendlink", (done) => {
    const data=({email:"mkaubr007@gmail.com"})
    chai
      .request(server)
      .get("/confirmregister/:token")
      .send({ token: "req.params.token" ,data})
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it("givendetails_whenproper_shouldNotbesendlink", (done) => {
    const data=({email:"mkaubr007@gmail.com"})
    chai
      .request(server)
      .get("/confirmregister/:token")
      .send({ token: "req.params.token" ,data})
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
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
});
