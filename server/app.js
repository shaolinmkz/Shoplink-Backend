import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';

const apiVersion = '/api/v1';

dotenv.config();

// Set up the express app
const app = express();

// Enable CORS
app.use(cors());

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyParser.json());

// catch index
app.use(routes);

// Routes
app.use(apiVersion, routes);

// catch all
app.use(routes);

// Set Port
const port = process.env.PORT;

app.listen(port);

export default app;
