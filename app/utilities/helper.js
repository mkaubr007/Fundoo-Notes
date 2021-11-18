const jwt=require('jsonwebtoken');
const bcrypt = require('bcryptjs');
class Helper {
    hashing = (password, callback) => {
      bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
          throw err;
        } else {
          return callback(null, hash);
        }
      });
    }
    token = (data) => {
      const dataForToken = {
        id: data._id,
        firstName: data._firstName,
        lastName: data._lastName,
        email: data._email
      };
      return jwt.sign({ dataForToken }, process.env.JWT_SECRET, { expiresIn: '24H' });
    }
}
module.exports = new Helper();