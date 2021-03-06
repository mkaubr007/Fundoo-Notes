const labelModel = require("../models/label");
const redisjs = require("../middleware/redis");
class Service {
  /**
   * @param {data}  : data will come from the controller body.
   * @description   : createLabel will takes the data from controller and send it to models
   */
  createLabel = (label, resolve, reject) => {
    labelModel
      .createLabel(label)
      .then((data) => resolve(data))
      .catch(() => reject());
  };

  /**
   * @description function written to get all labels
   * @returns data else returns error
   */
  getLabel = (id, callback) => {
    labelModel
      .getLabel(id)
      .then((data) => {
        callback(data, null);
      })
      .catch((err) => {
        callback(null, err);
      });
  };

  /**
   * @description function written to get label by ID
   * @param {*} a valid id is expected
   * @returns data else returns error
   */
  labelGetById =  async (id) => {
    try {
      let data = await redisjs.getData(id.labelId);
      if (!data) {
        data = await labelModel.labelGetById (id);
        if (data) {
          await redisjs.setData('getredisById', 6000, JSON.stringify(data));
          return data;
        } else {
          return null;
        }
      }
    } catch (err) {
      return err;
    }
  };


  /**
   * @description   : createLabel will takes the data from controller and send it to models
   * @param {*} a valid label is expected
   * @returns
   */
  updateLabel =(label, callback) => {
    labelModel.updateLabel(label, (error, data) => {
      if (error) {
        logger.error(error);
        return callback(error, null);
      } else {
        redisjs.clearCache(data.id);
        return callback(null, data);
      }
    });
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
