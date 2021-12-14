const validation = require('../utilities/validation.js');
const { logger } = require('../../logger/logger');
const labelService = require('../service/label');
class Label {
   /**
     * @description function writt
     * en to create label into database
     * @param {*} a valid req body is expected
     * @param {*} res
     */
   
    createLabel = (req, res) => {
      try {
        const valid = validation.validateLabel.validate(req.body);
        if (valid.error) {
          logger.error('Invalid label body');
          return res.status(400).send({
            message: 'Please enter valid label',
            success: false,
            error: valid.error
          });
        } else {
          const label = {
            labelName: req.body.labelName,
            userId: req.user.dataForToken.id
          };
          labelService.createLabel(label, resolve, reject);
          function resolve (data) {
            logger.info('Label inserted');
            res.status(201).send({
              message: 'Label created successfully',
              success: true,
              data: data
            });
          }
          function reject () {
            logger.error('Label not created');
            res.status(500).send({
              message: 'Label not created',
              success: false
            });
          }
        }
      } catch {
        logger.error('Label not created error occured');
        return res.status(500).send({
          message: 'Error occured',
          success: false
        });
      }
    };
    
    /**
     * @description function written to get all labels
     * @param {*} req
     * @param {*} res
     */

    getLabel = (req, res) => {
      const id = req.user.dataForToken.id;
      labelService.getLabel(id, (resolve, reject) => {
        if (resolve.length > 0) {
          logger.info('Found all labels');
          res.status(200).send({
            message: 'labels retrieved',
            success: true,
            data: resolve
          });
        } else {
          logger.error('Label Not found');
          res.status(404).send({
            message: 'Labels not found ',
            success: false
          });
        }
      });
    };

     /**
     * @description function written  to get label by ID
     * @param {*} req
     *
     * @param {*} res
     */

    labelGetById = async (req, res) => {
      try {
        const id = { userId: req.user.dataForToken.id, noteId: req.params.id };
        const data = await labelService.labelGetById(id);
        if (data.message) {
          return res.status(404).json({
            message: 'label not found',
            success: false
          });
        };
        return res.status(200).json({
          message: 'label retrieved succesfully',
          success: true,
          data: data
        });
      } catch (err) {
        return res.status(500).json({
          message: 'label not updated',
          success: false,
          data: err
        });
      }
    };

     /**
     * @description function written to update label
     * @param {*} a valid req body is expected
     * @param {*} res
     */

    updateLabel =async (req, res) => {
      try {
        const valid = validation.validateLabel.validate(req.body);
        if (valid.error) {
          logger.error('Invalid label given to update');
          return res.status(400).send({
            message: 'Please enter valid label',
            success: false,
            error: valid.error
          });
        } else {
          const label = {
            labelName: req.body.labelName,
            labelId: req.params.id
          };
          const updatedlabel = await labelService.updateLabel(label);
          if (updatedlabel.message) {
            logger.error('Label to be updated not found');
            return res.status(404).send({
              message: 'Label Not Found',
              success: false
            });
          }
          logger.info('label updated');
          return res.status(200).send({
            message: 'label updated',
            success: true,
            data: updatedlabel
          });
        }
      } catch (error) {
        logger.error('Label to be updated not foudn due to error');
        return res.status(500).send({
          message: 'Failed to update label',
          success: false,
          data: error
        });
      }
    };

    deleteLabelById = async (req, res) => {
      try{
        const id = { userId: req.user.dataForToken.id, labelId: req.params.id }; 
        const deleteLabelValidation = validation.labeldeleteValidation.validate(id);
        if (deleteLabelValidation.error) {
          return res.status(400).send({
            success: false,
            message: 'Wrong Input Validations',
            data: deleteLabelValidation
          });
        };
        const data = await labelService.deleteLabelById(id);
        if (data.message) {
          return res.status(404).json({
            message: 'label not found',
            success: false
          });
        };
        return res.status(200).json({
          message: 'label Deleted succesfully',
          success: true,
          data: data
        });
      }catch (err) {
        return res.status(500).json({
          message: 'label not deleted',
          success: false,
          data: err
        });
      }
    };
}
module.exports = new Label();