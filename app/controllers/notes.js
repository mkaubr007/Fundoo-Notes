const noteService = require('../service/notes');
const { logger } = require('../../logger/logger');

class Note {
    createNote =(req, res) => {
      try {
        const note = {

          userId: req.user.dataForToken.id,
          title: req.body.title,
          description: req.body.description
        };
        console.log(note);
        noteService.createNote(note, (error, data) => {
          if (error) {
            logger.error('failed to post note');
            return res.status(400).json({
              message: 'failed to post note',
              success: false
            });
          } else {
            logger.info('Successfully inserted note');
            return res.status(201).send({
              message: 'Successfully inserted note',
              success: true,
              data: data
            });
          }
        });
      } catch {
        logger.error('Internal server error');
        return res.status(500).json({
          message: 'Error occured',
          success: false
        });
      }
    }

    getNote = (req, res) => {
      try {
        const id = { id: req.user.dataForToken.id };
        noteService.getNote(id, resolve, reject);
        function resolve (data) {
          logger.info('Get All Notes successfully');
          return res.status(201).json({
            message: 'Get All Notes successfully',
            success: true,
            data: data
          });
        }
        function reject () {
          logger.error('Failed to get all notes');
          return res.status(400).json({
            message: 'failed to get all notes',
            success: false
          });
        }
      } catch {
        logger.error('Internal Error');
        return res.status(500).json({
          message: 'Internal Error'
        });
    }
  };
}
module.exports = new Note();