const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const faker = require("faker");

chai.use(chaiHttp);
const labelDB = require("./label.json");
const { expect } = require("chai");
chai.should();

describe("create label api", () => {
  it("label", (done) => {
    const token = labelDB.label.getlabelWithValidToken;
    const createlabel = {
      labelName: faker.lorem.word(),
    };
    chai
      .request(server)
      .post("/label")
      .set({ authorization: token })
      .send(createlabel)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property("success").eql(true);
        res.body.should.have
          .property("message")
          .eql("Label created successfully");
        done();
      });
  });

  it("givenCreatelabel_whenInvalidToken_shouldNotbeCreated", (done) => {
    const token = labelDB.label.invalidToken;
    const createlabel = {
      labelName: faker.lorem.word(),
    };
    chai
      .request(server)
      .post("/label")
      .set({ authorization: token })
      .send(createlabel)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("Invalid Token");
        done();
      });
  });
  it("GivenLabelDetails_When_Label_Name_Empty", (done) => {
    const token = labelDB.label.validToken;
    const createLabel = {
      labelName: "",
    };
    chai
      .request(server)
      .post("/label")
      .set({ authorization: token })
      .send(createLabel)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        res.body.should.have.property("success").eql(false);
        res.body.should.have
          .property("message")
          .eql("Please enter valid label");
        done();
      });
  });
});

describe("get label api", () => {
  it("notes", (done) => {
    const token = labelDB.label.getlabelWithValidToken;
    chai
      .request(server)
      .get("/label")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("success").eql(true);
        res.body.should.have.property("message").eql("labels retrieved");
        done();
      });
  });

  it("givenCreateNotes_whenInvalidToken_shouldNotbeGet", (done) => {
    const token = labelDB.label.getlabelWithInValidToken;
    chai
      .request(server)
      .get("/label")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("Invalid Token");
        done();
      });
  });
});

describe("Get label by ID api", () => {
  it("givenPoperDetails_ShouldGetlabel", (done) => {
    const token = labelDB.label.validToken;
    chai
      .request(server)
      .get("/label/61b31eed880372b4f25dedc8")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("success").eql(true);
        res.body.should.have
          .property("message")
          .eql("label retrieved succesfully");
        done();
      });
  });
});

describe("Update label api", () => {
  it("givenPoperDetails_ShouldUpdatelabel", (done) => {
    const token = labelDB.label.getlabelWithValidToken;
    const note = labelDB.updatelabel.validData;
    chai
      .request(server)
      .put("/label/61b05d85a5fe8ced01a3aeec")
      .set({ authorization: token })
      .send(note)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("success").eql(true);
        res.body.should.have.property("message").eql("label updated");
        done();
      });
  });

  it("givenInvalidToken_ShouldUpdatelabel", (done) => {
    const token = labelDB.label.getlabelWithInValidToken;
    const note = labelDB.updatelabel.validData;
    chai
      .request(server)
      .put("/label/61af1c3bfff30f91b6156807")
      .set({ authorization: token })
      .send(note)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("Invalid Token");
        done();
      });
  });
});

describe("Delete label api", () => {
  it("Success should return false", (done) => {
    const token = labelDB.label.getlabelWithValidToken;
    chai
      .request(server)
      .delete("/label/61af17e23c246f6856c3823")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("label not found");
        done();
      });
  });
  it("Success should return false when invalid", (done) => {
    const token = labelDB.label.getlabelWithInValidToken;
    chai
      .request(server)
      .delete("/label/61af17e23c2e46f6856c3823")
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          return done(
            err,
            "Please check details again and re-enter the details with proper format"
          );
        }
        res.should.have.status(400);
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("Invalid Token");
        done();
      });
  });
 
  it("givenImppoperDetails_ShouldNotDeletelabel", (done) => {
    const token = labelDB.label.getlabelWithValidToken;
    chai
      .request(server)
      .delete("/label/61b61e585da52449f9695776")
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          return done(
            err,
            "Please check details again and re-enter the details with proper format"
          );
        }
        res.should.have.status(500);
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("label not deleted");
        done();
      });
  });
});
