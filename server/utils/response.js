/**
 * @class Response
 * @description Specifies reusable response methods
 * @exports Response
 */
class Response {
  /**
   * @method success
   * @description reusable success response method
   * @property {object} req - request object
   * @property {object} res - response object
   * @property {number} statusCode - status code
   * @property {object} data - response object property
   * @returns {undefined}
   */
  static success({ req, res, statusCode, data }) {
    res
      .status(statusCode)
      .json({ method: req.method, status: 'success', ...data });
  }

  /**
   * @method error
   * @description reusable error response method
   * @property {object} req - request object
   * @property {object} res - response object
   * @property {number} statusCode - status code
   * @property {object} data - response object property
   * @returns {undefined}
   */
  static error({ req, res, statusCode, data }) {
    res
      .status(statusCode)
      .json({ method: req.method, status: 'error', ...data });
  }
}

export default Response;
