/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
const redis = require("redis");
const { logger } = require("../../logger/logger");
let client;
class Redis {
  constructor() {
    this.connect();
  }
  connect = () => {
    client = redis.createClient(6379, "127.0.0.1");
    client.connect();
    client.on("connect", function () {
      console.log("Connected!");
    });
  };

  /**
   * @description function written to provide data to user in minimal time using caching
   * @param {*} a req valid request is expected
   * @param {*} res depends on the request of user
   * @param {*} if there is no data function calls for next function
   */
  getData = async (key) => {
    client.get("getredisById", (error, data) => {
      if (error) {
        logger.error(error);
        throw error;
      } else if (data) {
        return JSON.parse(data);
      } else {
        return null;
      }
    });
  };

  /**
   * @description setting data to key into redis
   * @param userId
   * @param data
   */
  setData = async (key, time, data) => {
    client.setEx(key, time, data);
  };

   /**
    * @description clearing cache
    */

    clearCache = (key) => {
      client.del(key, (err, res) => {
        if (err) {
          logger.error('cache not cleared');
        } else {
          console.log('Cache cleared');
          logger.info('Cache cleared');
        }
      });
    }
}
module.exports = new Redis();
