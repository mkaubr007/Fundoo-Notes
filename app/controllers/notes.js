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

  getNoteById = async (req, res) => {
    try {
      const noteId = req.params.id;
      const id = { userId: req.user.dataForToken.id, noteId: req.params.id };

      const data = await noteService.getNoteById(id);
      if (data.message) {
        return res.status(404).json({
          message: 'Note not found',
          success: false
        });
      }
      return res.status(200).json({
        message: 'Note retrieved succesfully',
        success: true,
        data: data

      });
    } catch (err) {
      return res.status(500).json({
        message: 'Internal Error',
        success: false,
        data: err
      });
    }
  };

  updateNoteById =(req, res) => {
    try {
      const updateNote = {
        id: req.params.id,
        userId: req.user.dataForToken.id,
        title: req.body.title,
        description: req.body.description
      };
      console.log('note for controller :: ' + updateNote);
      noteService.updateNoteById(updateNote, (error, data) => {
        if (error) {
          logger.error('failed to update note');
          return res.status(400).json({
            message: 'failed to update note',
            success: false
          });
        } else {
          logger.info('Successfully inserted note');
          return res.status(201).send({
            message: 'Successfully update note',
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
  };

  deleteNoteById = async (req, res) => {
    try {
      const id = { userId: req.user.dataForToken.id, noteId: req.params.id };
      const data = await noteService.deleteNoteById(id);
      if (data.message) {
        return res.status(404).json({
          message: 'Note not found',
          success: false
        });
      }
      return res.status(200).json({
        message: 'Note Deleted succesfully',
        success: true,
        data: data
      });
    } catch (err) {
      return res.status(500).json({
        message: 'Note not updated',
        success: false,
        data: err
      });
    }
  }
}
module.exports = new Note();