import express, { Request, Response } from 'express';
import { eventService } from '../services/event.service';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = express.Router();

/**
 * POST /api/events
 * Create a new event
 */
router.post('/', authenticate, authorize('photographer'), async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const eventInput = {
      ...req.body,
      photographerId: req.user.userId,
    };

    const event = await eventService.createEvent(eventInput);

    res.status(201).json({
      message: 'Event created successfully',
      event,
    });
  } catch (error: any) {
    console.error('Create event error:', error);
    res.status(500).json({
      error: 'Failed to create event',
      message: error.message,
    });
  }
});

/**
 * GET /api/events
 * Get all events for current user
 */
router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { limit, lastKey } = req.query;
    const parsedLimit = limit ? parseInt(limit as string) : undefined;
    const parsedLastKey = lastKey ? JSON.parse(lastKey as string) : undefined;

    let result;

    if (req.user.role === 'photographer') {
      result = await eventService.getEventsByPhotographer(
        req.user.userId,
        parsedLimit,
        parsedLastKey
      );
    } else if (req.user.role === 'client') {
      result = await eventService.getEventsByClient(req.user.userId, parsedLimit, parsedLastKey);
    } else {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'Only photographers and clients can list events',
      });
    }

    res.json({
      events: result.items,
      lastKey: result.lastKey,
    });
  } catch (error: any) {
    console.error('Get events error:', error);
    res.status(500).json({
      error: 'Failed to get events',
      message: error.message,
    });
  }
});

/**
 * GET /api/events/:eventId
 * Get event by ID
 */
router.get('/:eventId', authenticate, async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;

    const event = await eventService.getEventById(eventId);

    if (!event) {
      return res.status(404).json({
        error: 'Event not found',
      });
    }

    // Check permissions
    if (
      req.user &&
      event.photographerId !== req.user.userId &&
      event.clientId !== req.user.userId &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'You do not have permission to view this event',
      });
    }

    res.json({ event });
  } catch (error: any) {
    console.error('Get event error:', error);
    res.status(500).json({
      error: 'Failed to get event',
      message: error.message,
    });
  }
});

/**
 * PUT /api/events/:eventId
 * Update event
 */
router.put(
  '/:eventId',
  authenticate,
  authorize('photographer'),
  async (req: Request, res: Response) => {
    try {
      const { eventId } = req.params;

      const event = await eventService.getEventById(eventId);

      if (!event) {
        return res.status(404).json({
          error: 'Event not found',
        });
      }

      // Check ownership
      if (event.photographerId !== req.user!.userId && req.user!.role !== 'admin') {
        return res.status(403).json({
          error: 'Forbidden',
          message: 'You can only update your own events',
        });
      }

      const updatedEvent = await eventService.updateEvent(eventId, req.body);

      res.json({
        message: 'Event updated successfully',
        event: updatedEvent,
      });
    } catch (error: any) {
      console.error('Update event error:', error);
      res.status(500).json({
        error: 'Failed to update event',
        message: error.message,
      });
    }
  }
);

/**
 * DELETE /api/events/:eventId
 * Delete event
 */
router.delete(
  '/:eventId',
  authenticate,
  authorize('photographer', 'admin'),
  async (req: Request, res: Response) => {
    try {
      const { eventId } = req.params;

      const event = await eventService.getEventById(eventId);

      if (!event) {
        return res.status(404).json({
          error: 'Event not found',
        });
      }

      // Check ownership
      if (event.photographerId !== req.user!.userId && req.user!.role !== 'admin') {
        return res.status(403).json({
          error: 'Forbidden',
          message: 'You can only delete your own events',
        });
      }

      await eventService.deleteEvent(eventId);

      res.json({
        message: 'Event deleted successfully',
      });
    } catch (error: any) {
      console.error('Delete event error:', error);
      res.status(500).json({
        error: 'Failed to delete event',
        message: error.message,
      });
    }
  }
);

/**
 * POST /api/events/:eventId/publish
 * Publish event (change status to active)
 */
router.post(
  '/:eventId/publish',
  authenticate,
  authorize('photographer'),
  async (req: Request, res: Response) => {
    try {
      const { eventId } = req.params;

      const event = await eventService.getEventById(eventId);

      if (!event) {
        return res.status(404).json({
          error: 'Event not found',
        });
      }

      // Check ownership
      if (event.photographerId !== req.user!.userId) {
        return res.status(403).json({
          error: 'Forbidden',
          message: 'You can only publish your own events',
        });
      }

      const publishedEvent = await eventService.publishEvent(eventId);

      res.json({
        message: 'Event published successfully',
        event: publishedEvent,
      });
    } catch (error: any) {
      console.error('Publish event error:', error);
      res.status(500).json({
        error: 'Failed to publish event',
        message: error.message,
      });
    }
  }
);

/**
 * GET /api/events/:eventId/stats
 * Get event statistics
 */
router.get('/:eventId/stats', authenticate, async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;

    const event = await eventService.getEventById(eventId);

    if (!event) {
      return res.status(404).json({
        error: 'Event not found',
      });
    }

    // Check permissions
    if (
      event.photographerId !== req.user!.userId &&
      event.clientId !== req.user!.userId &&
      req.user!.role !== 'admin'
    ) {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'You do not have permission to view event statistics',
      });
    }

    res.json({
      stats: event.stats,
    });
  } catch (error: any) {
    console.error('Get event stats error:', error);
    res.status(500).json({
      error: 'Failed to get event statistics',
      message: error.message,
    });
  }
});

export default router;