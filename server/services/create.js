/* eslint-disable no-return-await */
import db from '../database/models';

/**
 * @class CreateRecord
 * @description Specifies reusable helper methods
 * @exports CreateRecord
 */
export default class CreateRecord {
  /**
   * @method createRecord
   * @description create record
   * @param {object} model the data store model
   * @param {object} params - the filter parameters
   * @returns {function} the function to be called eventually
   */
  static async createRecord(model, params = {}) {
    return await db[model].create({ ...params });
  }
}
