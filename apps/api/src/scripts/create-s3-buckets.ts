import dotenv from 'dotenv';
import path from 'path';

// Load .env file from apps/api directory
dotenv.config({ path: path.join(__dirname, '../../.env') });

import {
  CreateBucketCommand,
  PutBucketCorsCommand,
  PutBucketLifecycleConfigurationCommand,
  PutPublicAccessBlockCommand,
  HeadBucketCommand,
  BucketLocationConstraint,
} from '@aws-sdk/client-s3';
import { s3Client, AWS_REGION, S3_BUCKETS } from '../config/aws.config';

async function createBucket(bucketName: string) {
  try {
    // Check if bucket exists
    try {
      await s3Client.send(new HeadBucketCommand({ Bucket: bucketName }));
      console.log(`ℹ️  Bucket already exists: ${bucketName}`);
      return;
    } catch (error: any) {
      if (error.name !== 'NotFound') {
        throw error;
      }
    }

    // Create bucket
    const createParams = {
      Bucket: bucketName,
      ...(AWS_REGION !== 'us-east-1' && {
        CreateBucketConfiguration: {
          LocationConstraint: AWS_REGION as BucketLocationConstraint,
        },
      }),
    };

    await s3Client.send(new CreateBucketCommand(createParams));
    console.log(`✅ Bucket created: ${bucketName}`);

    // Block public access
    await s3Client.send(
      new PutPublicAccessBlockCommand({
        Bucket: bucketName,
        PublicAccessBlockConfiguration: {
          BlockPublicAcls: true,
          IgnorePublicAcls: true,
          BlockPublicPolicy: true,
          RestrictPublicBuckets: true,
        },
      })
    );
    console.log(`🔒 Public access blocked for: ${bucketName}`);

    // Configure CORS
    await s3Client.send(
      new PutBucketCorsCommand({
        Bucket: bucketName,
        CORSConfiguration: {
          CORSRules: [
            {
              AllowedHeaders: ['*'],
              AllowedMethods: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD'],
              AllowedOrigins: ['*'], // Update this in production to specific domains
              ExposeHeaders: ['ETag'],
              MaxAgeSeconds: 3000,
            },
          ],
        },
      })
    );
    console.log(`🌐 CORS configured for: ${bucketName}`);

    // Configure Lifecycle Rules
    await s3Client.send(
      new PutBucketLifecycleConfigurationCommand({
        Bucket: bucketName,
        LifecycleConfiguration: {
          Rules: [
            {
              ID: 'TransitionThumbnailsToIA',
              Status: 'Enabled',
              Filter: {
                Prefix: 'photos/',
              },
              Transitions: [
                {
                  Days: 90,
                  StorageClass: 'STANDARD_IA',
                },
              ],
            },
            {
              ID: 'TransitionOriginalsToGlacier',
              Status: 'Enabled',
              Filter: {
                Prefix: 'photos/',
              },
              Transitions: [
                {
                  Days: 30,
                  StorageClass: 'GLACIER',
                },
              ],
            },
            {
              ID: 'DeleteTempFiles',
              Status: 'Enabled',
              Filter: {
                Prefix: 'temp/',
              },
              Expiration: {
                Days: 7,
              },
            },
          ],
        },
      })
    );
    console.log(`♻️  Lifecycle rules configured for: ${bucketName}`);
  } catch (error: any) {
    console.error(`❌ Error creating bucket ${bucketName}:`, error.message);
    throw error;
  }
}

async function createAllBuckets() {
  console.log('🚀 Starting S3 bucket creation...\n');

  try {
    await createBucket(S3_BUCKETS.MEDIA);

    console.log('\n✅ All S3 buckets created successfully!');
  } catch (error) {
    console.error('\n❌ Failed to create buckets:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  createAllBuckets();
}

export { createAllBuckets };
