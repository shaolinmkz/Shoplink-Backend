import { check } from 'express-validator';

/**
 * @description returns a starter template for express validator
 * @param {string} field
 * @returns {object} returns an object
 */
const checkTemplate = (field) => check(field).exists({
  checkNull: true,
  checkFalsy: true
});

/**
 * @description returns an express validator checker
 * @param {string} field
 * @returns {object} returns an object
 */
const subCheckTemplate = (field) => checkTemplate(field)
  .withMessage(`${field} is required`)
  .isString()
  .withMessage(`${field} should be a string`)
  .isLength({ min: 1 })
  .withMessage(`minimum character length for ${field} should be 1`)
  .isLength({ max: 50 })
  .withMessage(`maximum character length for ${field} should be 50`)
  .trim();

/**
 * @description Email validation function
 * @returns {object} returns a function
 */
export const validateEmail = checkTemplate('email')
  .withMessage('email is required')
  .isString()
  .withMessage('email should be a string')
  .matches(/^([A-z0-9]+)([._-]{0,1})([A-z0-9]+)@([A-z0-9-_.]+)\.([A-z]{2,3})$/)
  .withMessage('invalid email format')
  .trim();

/**
 * @description Password validation function
 * @returns {function} returns a function
 */
export const validatePassword = checkTemplate('password')
  .withMessage('password is required')
  .isString()
  .withMessage('password should be a string')
  .isLength({ min: 6 })
  .withMessage('minimum character length for password should be 6');

export default [
  subCheckTemplate('firstName'),
  subCheckTemplate('lastName')
];
