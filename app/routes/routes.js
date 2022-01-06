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
  app.post("/buildNote", helper.validateToken, noteController.createNote);
  app.get("/grabNotes", helper.validateToken, noteController.getNote);
  app.get("/grabNote/:id", helper.validateToken, noteController.getNoteById);
  app.put("/renewNote/:id",helper.validateToken,noteController.updateNoteById);
  app.delete("/excludeNote/:id",helper.validateToken,noteController.deleteNoteById);

  //api for label CRUD
  app.post("/buildLabel", helper.validateToken, label.createLabel);
  app.get("/grabLabels", helper.validateToken, label.getLabel);
  app.get("/grabLabel/:id", helper.validateToken, label.labelGetById);
  app.put("/renewLabel/:id", helper.validateToken, label.updateLabel);
  app.delete("/excludeLabel/:id", helper.validateToken, label.deleteLabelById);

  app.post("/addlabel/:id", helper.validateToken, noteController.addLabelById);
  app.delete("/excludeLabelFromNote/:id", helper.validateToken, noteController.deleteLabel);
};
