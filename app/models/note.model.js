const mongoose = require('mongoose');
const utilities = require('../utilities/helper.js');

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
},
{
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;

class UserModel {
    registerUser = (userDetails, callback) => {
        const newUser = new User({
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
          email: userDetails.email,
          password: userDetails.password
        });
        try {
          utilities.hashing(userDetails.password, (error, hash) => {
            if (hash) {
              newUser.password = hash;
              newUser.save((error, data) => {
                if (error) {
                  callback(error, null);
                } else {
                  callback(null, data);
                }
              });
            } else {
              throw error;
            }
          });
        } catch (error) {
          return callback('Internal error', null);
        }
      };
    }
    module.exports = new UserModel();