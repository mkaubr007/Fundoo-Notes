const userModel = require('../models/note.model.js');
const bcrypt = require('bcryptjs');
const utilities=require('../utilities/helper.js');
class UserService {
 
    registerUser = (user, callback) => {
      userModel.registerUser(user, (err, data) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }
      });
    }
    userLogin = (InfoLogin, callback) => {
      userModel.loginUser(InfoLogin, (error, data) => {
        if (data) {
          bcrypt.compare(InfoLogin.password, data.password, (error, validate) => {
            if (!validate) {
              return callback(error + 'Invalid Password', null);
            } else {
              const token = utilities.token(data);
              return callback(null, token);
            }
          });
        } else {
          return callback(error);
        }
      });
    }
  }
module.exports = new UserService();