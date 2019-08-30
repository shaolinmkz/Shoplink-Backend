/* eslint-disable no-return-await */
import db from '../database/models';

/**
 * @class FindOneOrAll
 * @description Specifies reusable helper methods
 * @exports FindOneOrAll
 */
export default class FindOneOrAll {
  /**
   * @method findOne
   * @description find one
   * @param {object} model the data store model
   * @param {object} params - the filter parameters
   * @returns {function} the function to be called ev  entually
   */
  static async findOne(model, params = {}) {
    return await db[model].findOne({ where: { ...params } });
  }
}
