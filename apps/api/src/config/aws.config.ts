import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { S3Client } from '@aws-sdk/client-s3';

// AWS Region
export const AWS_REGION = process.env.AWS_REGION || 'us-east-1';

// DynamoDB Table Names
export const TABLE_PREFIX = process.env.DYNAMODB_TABLE_PREFIX || 'photopedia-dev';
export const TABLES = {
  USERS: `${TABLE_PREFIX}-users`,
  EVENTS: `${TABLE_PREFIX}-events`,
  MEDIA: `${TABLE_PREFIX}-media`,
  ANALYTICS: `${TABLE_PREFIX}-analytics`,
  FAVORITES: `${TABLE_PREFIX}-favorites`,
};

// S3 Bucket Names
export const S3_BUCKETS = {
  MEDIA: process.env.S3_MEDIA_BUCKET || 'photopedia-media-dev',
};

// DynamoDB Client
const ddbClient = new DynamoDBClient({
  region: AWS_REGION,
  // If credentials are in .env, use them; otherwise use default chain (AWS CLI)
  ...(process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY && {
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  }),
});

// DynamoDB Document Client (for easier data handling)
export const docClient = DynamoDBDocumentClient.from(ddbClient, {
  marshallOptions: {
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  },
  unmarshallOptions: {
    wrapNumbers: false,
  },
});

// S3 Client
export const s3Client = new S3Client({
  region: AWS_REGION,
  // If credentials are in .env, use them; otherwise use default chain (AWS CLI)
  ...(process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY && {
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  }),
});

// Subscription Plan Limits
export const PLAN_LIMITS = {
  free: {
    maxEvents: 3,
    maxStorageGB: 5,
    maxVideosPerMonth: 0,
    faceRecognitionEnabled: false,
    watermarkEnabled: false,
    aiVideoEnabled: false,
  },
  starter: {
    maxEvents: 15,
    maxStorageGB: 50,
    maxVideosPerMonth: 3,
    faceRecognitionEnabled: true,
    watermarkEnabled: true,
    aiVideoEnabled: true,
  },
  professional: {
    maxEvents: -1, // unlimited
    maxStorageGB: 200,
    maxVideosPerMonth: 20,
    faceRecognitionEnabled: true,
    watermarkEnabled: true,
    aiVideoEnabled: true,
  },
  enterprise: {
    maxEvents: -1, // unlimited
    maxStorageGB: 500,
    maxVideosPerMonth: -1, // unlimited
    faceRecognitionEnabled: true,
    watermarkEnabled: true,
    aiVideoEnabled: true,
  },
};

export function getPlanLimits(plan: 'free' | 'starter' | 'professional' | 'enterprise') {
  return PLAN_LIMITS[plan];
}
