import express from 'express';
import dashboards from './dashboards/dashboards.js';

const router = express.Router();
router.use('/dashboards', dashboards);

export default router;
