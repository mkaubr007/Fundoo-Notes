const labelModel = require('../models/label');
class Service {
     /**
      * @param {data}  : data will come from the controller body.
      * @description   : createLabel will takes the data from controller and send it to models
     */
    createLabel = (label, resolve, reject) => {
      labelModel.createLabel(label)
        .then((data) => resolve(data))
        .catch(() => reject());
    };
     /**
      * @description function written to get all labels
      * @returns data else returns error
      */
    getLabel =(id, callback) => {
      labelModel.getLabel(id).then((data) => { callback(data, null); })
        .catch((err) => { callback(null, err); });
    };
     /**
      * @description function written to get label by ID
      * @param {*} a valid id is expected
      * @returns data else returns error
      */
    labelGetById = async (id) => {
      try {
        return await labelModel.labelGetById(id);
      } catch (err) {
        return err;
      }
    };
     /**
     * @description   : createLabel will takes the data from controller and send it to models
      * @param {*} a valid label is expected
      * @returns
      */
    updateLabel =async (label)=> {
      try {
        return await labelModel.updateLabel(label);
      } catch (error) {
        return error;
      }
    };
     /**
    * @param {data}  : data will come from the controller body.
    * @description   : createLabel will takes the data from controller and send it to models
    */
      deleteLabelById = async (id) => {
        try {
          return await labelModel.deleteLabelById(id);
        } catch (err) {
          return err;
        }
      };
}
module.exports = new Service();