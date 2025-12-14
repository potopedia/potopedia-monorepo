import { Request, Response, NextFunction } from 'express';
import { auth } from '../config/firebase.config';
import { userService } from '../services/user.service';
import { User } from '../models/user.model';

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: User;
      firebaseUser?: {
        uid: string;
        email?: string;
      };
    }
  }
}

/**
 * Authenticate user with Firebase token
 */
export async function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'No authentication token provided',
      });
    }

    const token = authHeader.substring(7);

    // Verify Firebase token
    const decodedToken = await auth.verifyIdToken(token);
    req.firebaseUser = {
      uid: decodedToken.uid,
      email: decodedToken.email,
    };

    // Get user from database
    const user = await userService.getUserByFirebaseUid(decodedToken.uid);

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        message: 'User account does not exist',
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        error: 'Account disabled',
        message: 'Your account has been disabled',
      });
    }

    req.user = user;

    // Update last login
    await userService.updateLastLogin(user.userId);

    next();
  } catch (error: any) {
    console.error('Authentication error:', error);

    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({
        error: 'Token expired',
        message: 'Authentication token has expired',
      });
    }

    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid authentication token',
    });
  }
}

/**
 * Authorize user by role
 */
export function authorize(...roles: Array<'photographer' | 'client' | 'guest' | 'admin'>) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Authentication required',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'You do not have permission to access this resource',
      });
    }

    next();
  };
}

/**
 * Optional authentication (doesn't fail if no token)
 */
export async function optionalAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }

    const token = authHeader.substring(7);
    const decodedToken = await auth.verifyIdToken(token);
    req.firebaseUser = {
      uid: decodedToken.uid,
      email: decodedToken.email,
    };

    const user = await userService.getUserByFirebaseUid(decodedToken.uid);
    if (user && user.isActive) {
      req.user = user;
    }

    next();
  } catch (error) {
    // Ignore authentication errors in optional auth
    next();
  }
}
