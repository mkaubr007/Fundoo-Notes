const { logger } = require('../../logger/logger');
const noteModel = require('../models/notes');
class Service {
    createNote = (note, callback) => {
      noteModel.createNote(note, (error, data) => {
        if (error) {
          logger.error(error);
          return callback(error, null);
        } else {
          return callback(null, data);
        }
      });
    }

    getNote = (id, resolve, reject) => {
      noteModel
        .getNote(id)
        .then((data) => resolve(data))
        .catch(() => reject());
    };

    getNoteById = async (id) => {
      try {
        return await noteModel.getNoteById(id);
      } catch (err) {
        return err;
      }
    }
}
module.exports = new Service();