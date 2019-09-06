import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import { Response } from './utils';
import wildcards from './routes/wildCardRoutes';
import routes from './routes';

const { log } = console;

const apiVersion = '/api/v1';

dotenv.config();

// Set up the express app
const app = express();

// Enable Helmet
app.use(helmet());

// Enable CORS
app.use(cors());

// Log requests to the console
app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.text());

// Initializing Passport
app.use(passport.initialize());

// Routes
app.use(apiVersion, routes);

// catch index route
app.get('/', (req, res) => Response.success({
  req,
  res,
  statusCode: 200,
  data: { message: 'Welcome to Shoplink' }
}));

// catch all non-exixtent routes
app.use(wildcards);

// Set Port
const port = process.env.PORT;


app.listen(port, () => log(`🔌 Connected on port ${port}`));

export default app;
