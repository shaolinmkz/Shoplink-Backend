import express from 'express';
import wildcards from './wildCardRoutes';
import customer from './customer';
import department from './departments';

const router = express.Router();

router.use(customer);
router.use(department);

router.use(wildcards); // this should always be at the bottom

export default router;
