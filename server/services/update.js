/* eslint-disable no-return-await */
import db from '../database/models';

/**
 * @class UpdateRecord
 * @description Specifies reusable helper methods
 * @exports UpdateRecord
 */
export default class UpdateRecord {
  /**
   * @method updateRecord
   * @description update record
   * @param {object} model the data store model
   * @param {object} fields - the fields to be updated
   * @param {object} params - the filter parameters
   * @returns {function} the function to be called eventually
   */
  static async updateRecord(model, fields = {}, params = {}) {
    return await db[model].update(fields, { where: { ...params } });
  }
}
