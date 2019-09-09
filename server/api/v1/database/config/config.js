import dotenv from 'dotenv';

dotenv.config();

const { LOGGING } = process.env;

/**
 * @function dbConfig
 * @description Database configuration
 * @returns {object} returns the database configuration
 */
const dbConfig = () => ({
  use_env_variable: 'DATABASE_URL',
  dialect: 'postgres',
  logging: JSON.parse(LOGGING)
});

module.exports = {
  development: dbConfig(),
  test: dbConfig(),
  production: dbConfig()
};
