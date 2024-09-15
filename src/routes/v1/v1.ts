import express from 'express';
import dashboards from './dashboards/dashboards.js';
import auth from './auth/auth.js';

const router = express.Router();
router.use('/dashboards', dashboards);
router.use('/auth', auth);

export default router;
