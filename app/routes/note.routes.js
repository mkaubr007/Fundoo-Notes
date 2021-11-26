
const controller = require('../controllers/note.controller.js');
module.exports = (app) => {
  // api for registration
  app.post('/register', controller.register);
   // api for login
  app.post('/login', controller.login);
    // api for forget pasword
  app.post('/forgotPassword', controller.forgotPassword);
}