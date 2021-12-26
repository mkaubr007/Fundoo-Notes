const mongoose = require("mongoose");
const utilities = require("../utilities/helper.js");
const { logger } = require("../../logger/logger");
const Otp = require("./otp.js");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

class userModel {
  /**
   * @description register User in the database
   * @param User
   * @param callback
   */
  registerUser = (userDetails, callback) => {
    const newUser = new User({
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: userDetails.email,
      password: userDetails.password,
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
      logger.error("Find error in model");
      return callback("Internal Error", null);
    }
  };
  /**
   * @description login User from the database
   * @param loginInfo
   * @param callback for service
   */
  loginUser = (loginData, callBack) => {
    //To find a user email in the database
    User.findOne({ email: loginData.email }, (error, data) => {
      if (error) {
        logger.error("Find error while loggin user");
        return callBack(error, null);
      } else if (!data) {
        logger.error("Invalid User");
        return callBack("Invalid Credential", null);
      } else {
        logger.info("Email id found");
        return callBack(null, data);
      }
    });
  };
  /**
   * @description mongoose function for forgot password
   * @param {*} email
   * @param {*} callback
   */
  forgotPassword = (data, callback) => {
    User.findOne({ email: data.email }, (err, data) => {
      if (data) {
        return callback(null, data);
      } else {
        logger.error("User with email id does not  exists");
        return callback(err, null);
      }
    });
  };

  /**
   * @description mongooose method for reseting the password
   * @param {*} userData
   * @param {*} callback
   * @returns
   */
  resetPassword = (userData, callback) => {
    Otp.findOne({ code: userData.code }, (error, data) => {
      if (data) {
        if (userData.code == data.code) {
          utilities.hashing(userData.password, (err, hash) => {
            if (hash) {
              userData.password = hash;
              User.updateOne(
                { $set: { password: userData.password } },
                (error, data) => {
                  if (data) {
                    return callback(null, "Updated successfully");
                  } else {
                    return callback("Error in updating", null);
                  }
                }
              );
            } else {
              return callback("Error in hash on password", null);
            }
          });
        } else {
          return callback("User not found", null);
        }
      } else {
        return callback("Otp doesnt match", null);
      }
    });
  };
}
module.exports = new userModel();
