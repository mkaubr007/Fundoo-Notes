const userModel = require('../models/note.model.js');
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
          if(data.password==InfoLogin.password){
            return callback(null,data);
          }else{
            return callback("password does not match",null)
          }
        } else {
          return callback(error,null);
        }
      });
    }
}
module.exports = new UserService();