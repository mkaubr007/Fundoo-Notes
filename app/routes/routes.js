const controller = require('../controllers/user.js');
const helper= require('../utilities/helper');
const noteController = require('../controllers/notes');
const label = require('../controllers/label');
const redis = require('../middleware/redis');
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
  app.get('/getnotes/:id', helper.validateToken, redis.redis_NOteById, noteController.getNoteById);
  app.put('/updatenotes/:id', helper.validateToken, noteController.updateNoteById);
  app.delete('/deletenotes/:id', helper.validateToken, noteController.deleteNoteById);
  
  //api for label CRUD
  app.post('/createlabel', helper.validateToken, label.createLabel);
  app.get('/getlabels', helper.validateToken, label.getLabel);
  app.get('/getlabel/:id', helper.validateToken, label.labelGetById);
  app.put('/updatelabel/:id', helper.validateToken, label.updateLabel);
  app.delete('/deletelabel/:id', helper.validateToken, label.deleteLabelById);
  
  app.post('/addlabel/:id', helper.validateToken, noteController.addLabelById);
  app.delete('/deleteLabelFromNote/:id', helper.validateToken, noteController.deleteLabel);
}