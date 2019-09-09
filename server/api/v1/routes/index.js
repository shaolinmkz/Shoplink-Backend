import express from 'express';
import customer from './customer';
import department from './departments';

const router = express.Router();

router.use(customer);
router.use(department);

export default router;
