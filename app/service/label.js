const labelModel = require('../models/label');
class Service {
   
    createLabel = (label, resolve, reject) => {
      labelModel.createLabel(label)
        .then((data) => resolve(data))
        .catch(() => reject());
    }
}
module.exports = new Service();