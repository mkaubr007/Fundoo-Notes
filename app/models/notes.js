const { logger } = require('../../logger/logger');
const mongoose = require('mongoose');
const noteSchema = mongoose.Schema({
  title: {
    type: String
  },
  description: {
    type: String,
    required: true,
    minlength: 2
  }
}, {
  timestamps: true

});

const NoteRegister = mongoose.model('NoteRegister', noteSchema);
class Model {
    createNote = (info, callback) => {
      const note = new NoteRegister({
        userId: info.userId,
        title: info.title,
        description: info.description
      });
      note.save((error, data) => {
        if (error) {
          logger.error(error);
          return callback(error, null);
        } else {
          return callback(null, data);
        }
      });
    }

    getNote = (id) => {
      return new Promise((resolve, reject) => {
        NoteRegister.find({ userId: id.id })
          .then((data) => resolve(data))
          .catch((err) => reject(err));
      });
    };

    getNoteById = async (id) => {
      try {
        return await NoteRegister.find({ $and: [{ _id: id.noteId }, { userId: id.userId }] });
      } catch (err) {
        return err;
      }
    }
}
module.exports = new Model();