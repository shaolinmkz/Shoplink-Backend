import express from 'express';
import { Response } from '../utils';

const wildcards = express.Router();

// Return 404 for non-existent routes
wildcards.use((req, res) => Response.error({
  req,
  res,
  statusCode: 404,
  data: { message: "Oops! What your looking for isn't here" }
}));

export default wildcards;
