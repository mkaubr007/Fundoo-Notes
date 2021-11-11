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
    };
}
module.exports = new UserService();