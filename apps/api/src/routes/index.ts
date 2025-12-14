import { Router } from 'express';
import authRoutes from './auth.routes';
import eventsRoutes from './events.routes';

const router = Router();

// Mount routes
router.use('/auth', authRoutes);
router.use('/events', eventsRoutes);

// API info
router.get('/', (req, res) => {
  res.json({
    name: 'PhotoPedia API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      events: '/api/events',
      health: '/health'
    }
  });
});

export default router;
