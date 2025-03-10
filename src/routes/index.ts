// src/routes/index.ts
import { Router } from 'express';
import apiRoutes from './api';

const router = Router();

// All API routes will be prefixed with /api
router.use('/api', apiRoutes);

// Catch-all for undefined routes
router.use((req, res) => res.status(404).send('Route not found!'));

export default router;
