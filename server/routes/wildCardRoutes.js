import express from 'express';
import { Response } from '../utils';

const wildcards = express.Router();

// Setup an index route
wildcards.get('/', (req, res) => Response.success({
  req,
  res,
  statusCode: 200,
  data: { message: 'Welcome to Shoplink' }
}));

// Return 404 for non-existent routes
wildcards.use((req, res) => Response.error({
  req,
  res,
  statusCode: 404,
  data: { message: "Oops! What your looking for isn't here" }
}));

export default wildcards;
