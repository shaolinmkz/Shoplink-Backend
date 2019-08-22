import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import routes from './routes';

const apiVersion = '/api/v1';

dotenv.config();

// Set up the express app
const app = express();

// Enable Helmet
app.use(helmet());

// Enable CORS
app.use(cors());

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.text());

// Routes
app.use(apiVersion, routes);

// catch index and catch all null routes
app.use(routes);

// Set Port
const port = process.env.PORT;

const { log } = console;

app.listen(port, () => log('Server running on port', port));

export default app;
