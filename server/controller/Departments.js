import { Response } from '../utils';
import { FindOneOrAll } from '../services';
import Helpers from '../utils/helpers';

const {
  findAndCountAll
} = FindOneOrAll;

const {
  formatPaginatedData
} = Helpers;

/**
 * @class Departments
 * @description Controller to fetch Departments
 * @exports Departments
 */
export default class Departments {
  /**
   * @description controller function that fetches all deparments
   * @param {object} req - request object
   * @param {object} res - response object
   * @return {undefined}
   */
  static async getAllDeparments(req, res) {
    try {
      let { limit, offset } = req.query;
      offset = Number(offset) || 0;
      limit = Number(limit) || 10;
      const departments = await findAndCountAll('Department', { offset, limit });
      const formattedData = formatPaginatedData({ offset, limit, ...departments }, 'departments');

      Response.success({ req,
        res,
        statusCode: 200,
        data: {
          data: formattedData
        }
      });
    } catch (error) {
      return Response.error({ req, res, statusCode: 500, data: { error } });
    }
  }
}
