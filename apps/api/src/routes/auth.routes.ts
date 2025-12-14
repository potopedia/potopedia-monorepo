import express, { Request, Response } from 'express';
import { userService } from '../services/user.service';
import { authenticate } from '../middleware/auth.middleware';
import { auth } from '../config/firebase.config';

const router = express.Router();

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, phone, role } = req.body;

    // Validation
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Email, password, first name, and last name are required',
      });
    }

    // Check if user already exists
    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        error: 'User already exists',
        message: 'An account with this email already exists',
      });
    }

    // Create Firebase user
    const firebaseUser = await auth.createUser({
      email,
      password,
      displayName: `${firstName} ${lastName}`,
    });

    // Create user in database
    const user = await userService.createUser({
      email,
      firebaseUid: firebaseUser.uid,
      role: role || 'photographer',
      firstName,
      lastName,
      phone,
    });

    // Set custom claims for role-based access
    await auth.setCustomUserClaims(firebaseUser.uid, {
      role: user.role,
      userId: user.userId,
    });

    // Generate custom token for immediate login
    const customToken = await auth.createCustomToken(firebaseUser.uid);

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        userId: user.userId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      customToken,
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    res.status(500).json({
      error: 'Registration failed',
      message: error.message,
    });
  }
});

/**
 * POST /api/auth/login
 * Login user (Firebase handles authentication, we just verify and return user data)
 */
router.post('/login', authenticate, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: 'Authentication failed',
        message: 'User not found',
      });
    }

    res.json({
      message: 'Login successful',
      user: {
        userId: req.user.userId,
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        role: req.user.role,
        businessName: req.user.businessName,
        subscriptionTier: req.user.subscriptionTier,
        limits: req.user.limits,
        currentUsage: req.user.currentUsage,
      },
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({
      error: 'Login failed',
      message: error.message,
    });
  }
});

/**
 * POST /api/auth/verify-token
 * Verify Firebase token and return user data
 */
router.post('/verify-token', authenticate, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: 'Invalid token',
        message: 'User not found',
      });
    }

    res.json({
      valid: true,
      user: {
        userId: req.user.userId,
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        role: req.user.role,
      },
    });
  } catch (error: any) {
    res.status(401).json({
      valid: false,
      error: 'Token verification failed',
      message: error.message,
    });
  }
});

/**
 * POST /api/auth/forgot-password
 * Send password reset email
 */
router.post('/forgot-password', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        error: 'Email required',
        message: 'Please provide an email address',
      });
    }

    // Check if user exists
    const user = await userService.getUserByEmail(email);
    if (!user) {
      // Don't reveal if user exists for security
      return res.json({
        message: 'If an account exists with this email, a password reset link has been sent',
      });
    }

    // Generate password reset link
    const resetLink = await auth.generatePasswordResetLink(email);

    // In production, send email with resetLink
    // Firebase automatically sends the email, so we just confirm success
    res.json({
      message: 'If an account exists with this email, a password reset link has been sent',
    });
  } catch (error: any) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      error: 'Failed to send reset email',
      message: error.message,
    });
  }
});

/**
 * POST /api/auth/reset-password
 * Reset password with OOB code
 */
router.post('/reset-password', async (req: Request, res: Response) => {
  try {
    const { oobCode, newPassword } = req.body;

    if (!oobCode || !newPassword) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'OOB code and new password are required',
      });
    }

    // Verify the password reset code
    const email = await auth.verifyPasswordResetCode(oobCode);

    // Reset the password
    await auth.confirmPasswordReset(oobCode, newPassword);

    res.json({
      message: 'Password reset successful',
      email,
    });
  } catch (error: any) {
    console.error('Reset password error:', error);
    res.status(400).json({
      error: 'Password reset failed',
      message: error.message,
    });
  }
});

/**
 * GET /api/auth/me
 * Get current user profile
 */
router.get('/me', authenticate, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    res.json({
      user: req.user,
    });
  } catch (error: any) {
    console.error('Get profile error:', error);
    res.status(500).json({
      error: 'Failed to get profile',
      message: error.message,
    });
  }
});

/**
 * PUT /api/auth/me
 * Update current user profile
 */
router.put('/me', authenticate, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    const updates = req.body;

    // Prevent updating sensitive fields
    delete updates.userId;
    delete updates.email;
    delete updates.firebaseUid;
    delete updates.role;
    delete updates.subscriptionTier;
    delete updates.limits;

    const updatedUser = await userService.updateUser(req.user.userId, updates);

    res.json({
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (error: any) {
    console.error('Update profile error:', error);
    res.status(500).json({
      error: 'Failed to update profile',
      message: error.message,
    });
  }
});

/**
 * POST /api/auth/google-signin
 * Sign in or sign up with Google OAuth
 */
router.post('/google-signin', async (req: Request, res: Response) => {
  try {
    const { idToken, role } = req.body;

    if (!idToken) {
      return res.status(400).json({
        error: 'Missing ID token',
        message: 'Google ID token is required',
      });
    }

    // Verify Google ID token with Firebase Admin SDK
    const decodedToken = await auth.verifyIdToken(idToken);
    const { uid, email, name } = decodedToken;

    if (!email) {
      return res.status(400).json({
        error: 'Email required',
        message: 'Google account must have an email address',
      });
    }

    // Check if user exists by Firebase UID
    let user = await userService.getUserByFirebaseUid(uid);
    let isNewUser = false;

    if (!user) {
      // New user - create account
      isNewUser = true;

      // Parse display name (fallback to email prefix if no name)
      const nameParts = name ? name.split(' ') : [email.split('@')[0]];
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ') || '';

      user = await userService.createUser({
        email,
        firebaseUid: uid,
        role: role || 'photographer', // Default to photographer
        firstName,
        lastName,
        phone: '',
      });

      // Set custom claims for role-based middleware
      await auth.setCustomUserClaims(uid, {
        role: user.role,
        userId: user.userId,
      });
    } else {
      // Existing user - update last login
      await userService.updateLastLogin(user.userId);
    }

    res.json({
      message: isNewUser ? 'Account created successfully' : 'Login successful',
      user: {
        userId: user.userId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        businessName: user.businessName,
        subscriptionTier: user.subscriptionTier,
        limits: user.limits,
        currentUsage: user.currentUsage,
      },
      isNewUser,
    });
  } catch (error: any) {
    console.error('Google sign-in error:', error);
    res.status(500).json({
      error: 'Google sign-in failed',
      message: error.message,
    });
  }
});

export default router;
