const controller = require("../controllers/user.js");
const helper = require("../utilities/helper");
const noteController = require("../controllers/notes");
const label = require("../controllers/label");

module.exports = (app) => {
  // api for registration
  app.post("/register", controller.register);
  // Confirm Register
  app.get("/confirmregister/:token", controller.confirmRegister);
  // api for login
  app.post("/login", controller.login);
  // api for forget pasword
  app.post("/forgotPassword", controller.forgotPassword);
  //api for reset-password
  app.put("/reset-Password", controller.resetPassword);

  //api for CRUD
  app.post("/note", helper.validateToken, noteController.createNote);
  app.get("/note", helper.validateToken, noteController.getNote);
  app.get("/note/:id", helper.validateToken, noteController.getNoteById);
  app.put("/note/:id",helper.validateToken,noteController.updateNoteById);
  app.delete("/note/:id",helper.validateToken,noteController.deleteNoteById);

  //api for label CRUD
  app.post("/label", helper.validateToken, label.createLabel);
  app.get("/label", helper.validateToken, label.getLabel);
  app.get("/label/:id", helper.validateToken, label.labelGetById);
  app.put("/label/:id", helper.validateToken, label.updateLabel);
  app.delete("/label/:id", helper.validateToken, label.deleteLabelById);

  app.post("/addlabel/:id", helper.validateToken, noteController.addLabelById);
  app.delete("/deleteLabelFromNote/:id", helper.validateToken, noteController.deleteLabel);
};
