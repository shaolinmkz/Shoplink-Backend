import { validationResult } from 'express-validator';
import { Response } from '../utils';

/**
   * @method captureErrors
   * @description Captures the errors collected by the express validator
   * @param {object} req
   * @param {object} res
   * @param {callback} next
   * @return {undefined}
   */
const captureErrors = (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors = errors.array().map((error) => ({
      message: error.msg,
      inputField: error.param
    }));
    Response.error({
      req,
      res,
      statusCode: 422,
      data: { errors }
    });
  } else {
    next();
  }
};

export default captureErrors;
