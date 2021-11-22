const userService = require('../service/service.js');
const validation = require('../utilities/validation.js')
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
              return res.status(200).json({
                success: true,
                message: 'User Registered',
                data: data
              });
            }
          });
        } catch (error) {
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
    }
  module.exports = new Controller();