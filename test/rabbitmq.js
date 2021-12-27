const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");

chai.use(chaiHttp);
const { expect } = require("chai");
const { string } = require("joi");
chai.should();
describe("rabbitmq_sucessShould_returnTrue ", () => {
  it("givenresetdetails_whenproper_shouldberesetlinkSent", (done) => {
    chai
      .request(server)
      .get("/confirmregister/:token")
      .send({ token: "req.params.token" })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
