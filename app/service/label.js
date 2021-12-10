const labelModel = require('../models/label');
class Service {
   
    createLabel = (label, resolve, reject) => {
      labelModel.createLabel(label)
        .then((data) => resolve(data))
        .catch(() => reject());
    };

    getLabel =(id, callback) => {
      labelModel.getLabel(id).then((data) => { callback(data, null); })
        .catch((err) => { callback(null, err); });
    };

    labelGetById = async (id) => {
      try {
        return await labelModel.labelGetById(id);
      } catch (err) {
        return err;
      }
    };

    async updateLabel (label) {
      try {
        return await labelModel.updateLabel(label);
      } catch (error) {
        return error;
      }
    };
}
module.exports = new Service();