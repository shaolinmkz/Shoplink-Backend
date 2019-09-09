import { Response } from '../utils';
import { FindOneOrAll } from '../services';

const { findAll } = FindOneOrAll;

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
      const departments = await findAll('Department', {}, [], ['createdAt', 'updatedAt']);
      Response.success({ req,
        res,
        statusCode: 200,
        data: {
          departments
        }
      });
    } catch (error) {
      return Response.error({ req, res, statusCode: 500, data: { error } });
    }
  }
}
