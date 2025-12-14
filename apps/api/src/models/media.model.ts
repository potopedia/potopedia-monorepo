export interface Media {
  PK: string;                    // EVENT#{eventId}
  SK: string;                    // MEDIA#{mediaType}#{uploadDate}#{mediaId}

  // Core Fields
  mediaId: string;               // uuid
  eventId: string;
  photographerId: string;
  mediaType: 'photo' | 'video';

  // File Info
  fileName: string;
  originalFileName: string;
  fileSize: number;              // bytes
  mimeType: string;

  // S3 Storage
  s3Key: string;                 // photos/{eventId}/{mediaId}.jpg
  s3Bucket: string;
  s3Region: string;

  // Processed Versions (for photos)
  versions?: {
    thumbnail: string;           // S3 key for thumbnail (400x400)
    medium: string;              // S3 key for medium (1200px)
    large: string;               // S3 key for large (2400px)
    original: string;            // S3 key for original (watermarked if enabled)
    originalUnwatermarked: string; // S3 key for original without watermark
  };

  // Video-specific (for videos)
  videoMetadata?: {
    duration: number;            // seconds
    resolution: string;          // e.g., "1920x1080"
    codec: string;
    frameRate: number;
    bitrate: number;
    thumbnail: string;           // S3 key for video thumbnail
    streamingUrl?: string;       // CloudFront URL or S3 presigned URL
    formats?: {
      hls?: string;              // HLS playlist S3 key
      dash?: string;             // DASH manifest S3 key
      mp4_720p?: string;         // MP4 720p S3 key
      mp4_1080p?: string;        // MP4 1080p S3 key
    };
  };

  // Photo-specific
  photoMetadata?: {
    width: number;
    height: number;
    orientation: number;
    camera?: string;
    lens?: string;
    iso?: number;
    shutterSpeed?: string;
    aperture?: string;
    focalLength?: string;
    takenAt?: number;            // EXIF timestamp
    location?: {
      lat: number;
      lng: number;
    };
  };

  // AI Processing
  aiAnalysis?: {
    faces: Array<{
      faceId: string;
      boundingBox: { x: number; y: number; width: number; height: number };
      confidence: number;
      personId?: string;         // Labeled person ID
      personName?: string;       // Labeled name
      emotions?: { happy: number; sad: number; neutral: number };
      age?: number;
      gender?: string;
    }>;
    labels: string[];            // AI-detected objects (e.g., "cake", "flowers")
    scenes: string[];            // AI-detected scenes (e.g., "wedding", "outdoor")
    colors: string[];            // Dominant colors
    qualityScore?: number;       // 0-100
  };

  // Watermark
  hasWatermark: boolean;
  watermarkApplied?: boolean;

  // Engagement
  views: number;
  downloads: number;
  favorites: number;

  // Status
  processingStatus: 'pending' | 'processing' | 'completed' | 'failed';
  isDeleted: boolean;

  // GSI1: Media type and upload date
  GSI1PK?: string;               // EVENT#{eventId}#MEDIA#{mediaType}
  GSI1SK?: string;               // UPLOADED#{uploadDate}

  // GSI2: Photographer's all media
  GSI2PK?: string;               // PHOTOGRAPHER#{photographerId}
  GSI2SK?: string;               // MEDIA#{uploadDate}

  // GSI3: Face search (for finding photos of specific person)
  GSI3PK?: string;               // PERSON#{personId}
  GSI3SK?: string;               // EVENT#{eventId}#MEDIA#{mediaId}

  // Metadata
  uploadedAt: number;
  processedAt?: number;
  updatedAt: number;
}

export interface CreateMediaInput {
  eventId: string;
  photographerId: string;
  mediaType: 'photo' | 'video';
  fileName: string;
  originalFileName: string;
  fileSize: number;
  mimeType: string;
  s3Key: string;
  s3Bucket: string;
  s3Region: string;
}

export interface UpdateMediaInput {
  versions?: {
    thumbnail: string;
    medium: string;
    large: string;
    original: string;
    originalUnwatermarked: string;
  };
  videoMetadata?: {
    duration: number;
    resolution: string;
    codec: string;
    frameRate: number;
    bitrate: number;
    thumbnail: string;
    streamingUrl?: string;
    formats?: {
      hls?: string;
      dash?: string;
      mp4_720p?: string;
      mp4_1080p?: string;
    };
  };
  photoMetadata?: {
    width: number;
    height: number;
    orientation: number;
    camera?: string;
    lens?: string;
    iso?: number;
    shutterSpeed?: string;
    aperture?: string;
    focalLength?: string;
    takenAt?: number;
    location?: {
      lat: number;
      lng: number;
    };
  };
  aiAnalysis?: Media['aiAnalysis'];
  processingStatus?: 'pending' | 'processing' | 'completed' | 'failed';
  hasWatermark?: boolean;
  watermarkApplied?: boolean;
}
