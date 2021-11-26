const userService = require('../service/service.js');
const validation = require('../utilities/validation.js');
const { logger } = require('../../logger/logger');
require('dotenv').config();
class Controller {
    register = (req, res) => {
      try {
        const user = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password
        };        
        const registerValidation = validation.authRegister.validate(user)
        if (registerValidation.error) {
            return res.status(400).send({
              success: false,
              message: 'Wrong Input Validations',
              data: registerValidation
            });           
        }
        userService.registerUser(user, (error, data) => {
          if (error) {
            return res.status(409).json({
                success: false,
                message: 'User already exist'
              });
            } else {
              logger.info('User registered');
              return res.status(200).json({
                success: true,
                message: 'User Registered',
                data: data
              });
            }
          });
        } catch (error) {
          logger.error('Internal server error');
          return res.status(500).json({
            success: false,
            message: 'Error While Registering',
            data: null
          });
        }
      }


      login = (req, res) => {
        try {
          const userLoginInfo = {
            email: req.body.email,
            password: req.body.password
          };
          const loginValidation = validation.authLogin.validate(userLoginInfo);
          if (loginValidation.error) {
            console.log(loginValidation.error);
            logger.error(loginValidation.error);
            res.status(400).send({
              success: false,
              message: loginValidation.error.message
            });
          }
          userService.userLogin(userLoginInfo, (error,data) => {
            if (error) {
              return res.status(400).json({
                success: false,
                message: 'Unable to login. Please enter correct info',
                error
              });
            }
            return res.status(200).json({
              success: true,
              message: 'User logged in successfully',
              data: data
            });
          });
        } catch (error) {
          return res.status(500).json({
            success: false,
            message: 'Error while Login',error,
            data: null
          });
        }
      }; 
      
    forgotPassword = (req, res) => {
      try {
        const userCredential = {
          email: req.body.email
        };
        const validationforgotPassword =
        validation.authenticateLogin.validate(userCredential);

        if (validationforgotPassword.error) {
          logger.error('Wrong Input Validations');
          return res.status(400).send({
            success: false,
            message: 'Wrong Input Validations',
            data: validationforgotPassword
          });
        }
        userService.forgotPassword(userCredential, (error, result) => {
          console.log("controller", userCredential);
          if (error) {
            return res.status(400).send({
              success: false,
              message: 'failed to send email'
            });
          } else {
            return res.status(200).send({
              success: true,
              message: 'Email sent successfully'
            });
          }
        });
      } catch (error) {
        logger.error('Internal server error');
        return res.status(500).send({
          success: false,
          message: 'Internal server error',
          result: null
        });
      }
    };
    resetPassword=(req, res) => {
      try {
        const userData = {
          token: req.body.token,
          password: req.body.password
        };

        const resetVlaidation = validation.validateReset.validate(userData);
        if (resetVlaidation.error) {
          logger.error('Invalid password');
          res.status(422).send({
            success: false,
            message: 'Invalid password'
          });
          return;
        }

        userService.resetPassword(userData, (error, userData) => {
          if (error) {
            logger.error(error);
            return res.status(400).send({
              message: error,
              success: false
            });
          } else {
            logger.info('Password reset succesfully');
            return res.status(200).json({
              success: true,
              message: 'Password reset succesfully',
              data: userData
            });
          }
        });
      } catch (error) {
        logger.error('Internal server error');
        return res.status(500).send({
          success: false,
          message: 'Internal server error',
          data: null
        });
      }
    }
  }
  module.exports = new Controller();