
const controller = require('../controllers/note.controller.js');
module.exports = (app) => {
  // api for registration
  app.post('/register', controller.register);
}