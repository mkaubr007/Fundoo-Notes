/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
const redis = require("redis");
const client = redis.createClient();
const { logger } = require('../../logger/logger');

class Redis {
  /**
     * @description function written to provide data to user in minimal time using caching
     * @param {*} a req valid request is expected
     * @param {*} res depends on the request of user
     * @param {*} if there is no data function calls for next function
     */
   redis_NOteById = (req, res, next) => {
     const id= req.params.id;
     client.get(id, (error, redis_data) => {
       if (error) {
         logger.error(error);
         throw error;
       } else if (redis_data) {
         logger.info('get note successfully retrieved');
         res.status(200).send({
           redis_NoteById: JSON.parse(redis_data),
           message: 'get note successfully retrieved',
           success: true
         });
       } else {
         next();
       }
     });
   };

 /**
    * @description setting data to key into redis
    * @param userId
    * @param data
    */

  setData = (key, time, redis_data) => {
    client.setEx(key, time, redis_data);
  };

}
module.exports = new Redis();
