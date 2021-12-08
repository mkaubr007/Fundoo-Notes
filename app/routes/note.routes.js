
const controller = require('../controllers/note.controller.js');
const noteController = require('../controllers/notes');
const helper= require('../utilities/helper');
const label = require('../controllers/label');

module.exports = (app) => {
  // api for registration
  app.post('/register', controller.register);
   // api for login
  app.post('/login', controller.login);
    // api for forget pasword
  app.post('/forgotPassword', controller.forgotPassword);
  //api for reset-password
  app.put('/reset-Password', controller.resetPassword);
  //api for CRUD
  app.post('/createnotes', helper.validateToken, noteController.createNote);
  app.get('/getnotes', helper.validateToken, noteController.getNote);
  app.get('/getnotes/:id', helper.validateToken, noteController.getNoteById);
  app.put('/updatenotes/:id', helper.validateToken, noteController.updateNoteById);
  app.delete('/deletenotes/:id', helper.validateToken, noteController.deleteNoteById);
  //api for level CRUD
  app.post('/createlabel', helper.validateToken, label.createLabel);
  app.get('/getlabels', helper.validateToken, label.getLabel);
}