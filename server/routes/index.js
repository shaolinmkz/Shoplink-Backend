import express from 'express';
import wildcards from './wildCardRoutes';
import customer from './customer';

const router = express.Router();

router.use(customer);

router.use(wildcards); // this should always be at the bottom

export default router;
