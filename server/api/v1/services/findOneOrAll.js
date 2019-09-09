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
   * @returns {function} the function to be called eventually
   */
  static async findOne(model, params = {}) {
    return await db[model].findOne({ where: { ...params } });
  }

  /**
   * @method findAll
   * @description find one
   * @param {object} model the data store model
   * @param {object} params - the filter parameters
   * @param {object} include - the excluded attributes
   * @param {object} exclude - the include attributes
   * @returns {function} the function to be called eventually
   */
  static async findAll(model, params = {}, include = [], exclude = []) {
    return await db[model].findAll({ where: { ...params }, attributes: { include, exclude } });
  }
}
