const mongoose = require('mongoose');
const utilities = require('../utilities/helper.js');
const bcrypt = require('bcryptjs');
const { logger } = require('../../logger/logger');
const Otp = require('./otp.js');
const { response } = require('express');
const { checkout } = require('superagent');


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

class userModel {

    registerUser = (userDetails, callback) => {
      console.log(userDetails);
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
      }
      catch (error) {
        logger.error('Find error in model');
          return callback('Internal Error', null)
      }
  }  
  
  loginUser= (loginData, callBack) => {
    //To find a user email in the database
    User.findOne({ email: loginData.email }, (error, data) => {
        if (error) {
          logger.error('Find error while loggin user');
            return callBack(error, null);           
        } else if(!data){
          logger.error('Invalid User');
            return callBack("Invalid Credential", null);
        }else{
          logger.info('Email id found');
            return callBack(null,data);
        }
    });
  }

  forgotPassword = (data, callback) => {
     User.findOne({ email: data.email }, (err, data) => {
      if (data) {
        logger.error('User with email id exists');
        return callback(null,data);
      } else {
        return callback(err,null);
      }
    });
  };

  resetPassword = (userData, callback) =>{
    Otp.findOne({code: userData.code }, (error, data) =>{
        if(data){
          bcrypt.compare(userData.code, data.code, (error, validate)=>{
            if(!validate){
              return callback ("User not found this email id", null)
            }else{
              utilities.hashing(userData.newPassword, (err, hash) => {
                if (hash) {
                    userData.newPassword = hash;
                    User.updateOne({"password": userData.newPassword}, (error, data) => {
                        if(data){
                            return callback (null, "Updated successfully")
                        }
                        else{
                            return callback ("Error in updating", null)
                        }
                    })
                }else{
                  return callback ("Error in hash on password", null)
                }
              })
            }
          })
         
        }else{
        return callback(error,null)
      }
    })
  }
}
module.exports = new userModel(); 