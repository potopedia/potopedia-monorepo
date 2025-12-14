export interface Event {
  PK: string;                    // EVENT#{eventId}
  SK: string;                    // METADATA

  // Core Fields
  eventId: string;               // uuid
  photographerId: string;        // Owner

  // Event Details
  eventName: string;
  eventDate: number;             // timestamp
  eventTime?: string;            // HH:MM
  location: string;
  description: string;
  eventType?: 'wedding' | 'corporate' | 'birthday' | 'graduation' | 'other';

  // Client Association
  clientId?: string;             // If hired by a client
  clientName?: string;
  clientEmail?: string;

  // Gallery Settings
  galleryCode: string;           // Unique access code (e.g., SMITH-WEDDING-2025)
  galleryPassword?: string;      // bcrypt hashed, optional
  galleryExpiry?: number;        // timestamp, optional
  isPublic: boolean;

  // Access Control
  accessSettings: {
    allowDownload: boolean;
    allowFaceSearch: boolean;
    requirePassword: boolean;
    showPhotographerInfo: boolean;
  };

  // QR Code
  qrCodeUrl?: string;            // S3 key for QR code image

  // Stats
  stats: {
    totalPhotos: number;
    totalVideos: number;
    totalViews: number;
    totalDownloads: number;
    totalFavorites: number;
    uniqueVisitors: number;
  };

  // Status
  status: 'draft' | 'active' | 'completed' | 'archived' | 'expired';

  // GSI1: Photographer's events
  GSI1PK?: string;               // PHOTOGRAPHER#{photographerId}
  GSI1SK?: string;               // EVENT#{eventDate}

  // GSI2: Gallery code lookup
  GSI2PK?: string;               // CODE#{galleryCode}
  GSI2SK?: string;               // EVENT

  // GSI3: Client's events
  GSI3PK?: string;               // CLIENT#{clientId}
  GSI3SK?: string;               // EVENT#{eventDate}

  // Metadata
  createdAt: number;
  updatedAt: number;
  publishedAt?: number;
}

export interface CreateEventInput {
  photographerId: string;
  eventName: string;
  eventDate: number;
  eventTime?: string;
  location: string;
  description: string;
  eventType?: 'wedding' | 'corporate' | 'birthday' | 'graduation' | 'other';
  clientId?: string;
  clientName?: string;
  clientEmail?: string;
  galleryPassword?: string;
  galleryExpiry?: number;
  isPublic: boolean;
  accessSettings: {
    allowDownload: boolean;
    allowFaceSearch: boolean;
    requirePassword: boolean;
    showPhotographerInfo: boolean;
  };
}

export interface UpdateEventInput {
  eventName?: string;
  eventDate?: number;
  eventTime?: string;
  location?: string;
  description?: string;
  eventType?: 'wedding' | 'corporate' | 'birthday' | 'graduation' | 'other';
  clientId?: string;
  clientName?: string;
  clientEmail?: string;
  galleryPassword?: string;
  galleryExpiry?: number;
  isPublic?: boolean;
  accessSettings?: {
    allowDownload: boolean;
    allowFaceSearch: boolean;
    requirePassword: boolean;
    showPhotographerInfo: boolean;
  };
  status?: 'draft' | 'active' | 'completed' | 'archived' | 'expired';
}
