import express from 'express';
import wildcards from './wildCardRoutes';

const router = express.Router();

router.use(wildcards);

export default router;
