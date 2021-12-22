const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const faker = require('faker');

chai.use(chaiHttp);
const redisDB = require('./redis.json');
const { expect } = require('chai');
const { string } = require('joi');
chai.should();
describe('Get notes by ID api with redis', () => {
    it('givenPoperDetails_ShouldGetNote', (done) => {
      const token = redisDB.redis.getNoteWithValidToken;
      chai
        .request(server)
        .get('/getnotes/6165357e39139e12b1b2986f')
        .set({ authorization: token })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('givenPoperDetails_ShouldGetNote', (done) => {
        const token = redisDB.redis.getNoteWithInValidToken;
        chai
          .request(server)
          .get('/getnotes/6165357e39139e12b1b2986f')
          .set({ authorization: token })
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
  });