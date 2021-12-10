const userModel = require('../models/note.model.js');
const bcrypt = require('bcryptjs');
const utilities=require('../utilities/helper.js');
const { logger } = require('../../logger/logger');
const nodemailer = require('../utilities/nodeemailer.js');
class UserService {
   /**
     * @description Create and save user then send response to controller
     * @method registerUser to save the user
     * @param callback callback for controller
     */
    registerUser = (user, callback) => {
      userModel.registerUser(user, (err, data) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }
      });
    }
    
    /**
     * @description sends the data to loginApi in the controller
     * @method userLogin
     * @param callback callback for controller
     */
    userLogin = (InfoLogin, callback) => {
      userModel.loginUser(InfoLogin, (error, data) => {
        if (data) {
          bcrypt.compare(InfoLogin.password, data.password, (error, validate) => {
            if (!validate) {
              logger.error(error);
              return callback(error + 'Invalid Password', null);
            } else {
              logger.info(' token generated ');
              const token = utilities.token(data);
              return callback(null, token);
            }
          });
        } else {
          logger.error(error);
          return callback(error);
        }
      });
    };
    
    /**
     * @description sends the code to forgotPasswordAPI in the controller
     * @method forgotPassword
     * @param callback callback for controller
     */ 
  forgotPassword = (email, callback) => {
    userModel.forgotPassword(email, (error, data) => {
      if (error) {
        logger.error(error);
        return callback(error, null);
      } else {
        return callback(null, nodemailer.sendEmail(data));
      }
    });
  };
    /**
     * @description it acts as a middleware between controller and model for reset password
     * @param {*} inputData
     * @param {*} callback
     * @returns
     */
  resetPassword = (userData, callback) => {
        userModel.resetPassword(userData, (error, data) => {
          if (error) {
            logger.error(error);
            return callback(error, null);
          } else {
            return callback(null, data);
          }
        });
  }
}
module.exports = new UserService();