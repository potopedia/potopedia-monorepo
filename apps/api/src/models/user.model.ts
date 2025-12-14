export interface User {
  PK: string;                    // USER#{userId}
  SK: string;                    // PROFILE

  // Core Fields
  userId: string;                // uuid
  email: string;
  firebaseUid: string;          // Firebase Auth UID
  role: 'photographer' | 'client' | 'guest' | 'admin';

  // Profile
  firstName: string;
  lastName: string;
  phone?: string;
  profilePhoto?: string;        // S3 key

  // Business Info (for photographers)
  businessName?: string;
  businessLogo?: string;        // S3 key
  watermarkSettings?: {
    enabled: boolean;
    opacity: number;
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
    customImage?: string;      // S3 key
  };

  // Subscription
  subscriptionTier: 'free' | 'starter' | 'professional' | 'enterprise';
  subscriptionStatus: 'active' | 'inactive' | 'cancelled' | 'trial';
  subscriptionStartDate?: number;  // timestamp
  subscriptionEndDate?: number;    // timestamp
  stripeCustomerId?: string;

  // Usage Limits (based on subscription)
  limits: {
    maxEvents: number;
    maxStorageGB: number;
    maxVideosPerMonth: number;
    faceRecognitionEnabled: boolean;
    watermarkEnabled: boolean;
    aiVideoEnabled: boolean;
  };

  // Current Usage
  currentUsage: {
    totalEvents: number;
    totalStorageGB: number;
    videosThisMonth: number;
  };

  // GSI1: Email lookup
  GSI1PK?: string;               // EMAIL#{email}
  GSI1SK?: string;               // USER

  // GSI2: Role-based queries
  GSI2PK?: string;               // ROLE#{role}
  GSI2SK?: string;               // USER#{userId}

  // Metadata
  createdAt: number;            // timestamp
  updatedAt: number;
  lastLoginAt?: number;
  isActive: boolean;
}

export interface CreateUserInput {
  email: string;
  firebaseUid: string;
  role: 'photographer' | 'client' | 'guest' | 'admin';
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface UpdateUserInput {
  firstName?: string;
  lastName?: string;
  phone?: string;
  profilePhoto?: string;
  businessName?: string;
  businessLogo?: string;
  watermarkSettings?: {
    enabled: boolean;
    opacity: number;
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
    customImage?: string;
  };
}
