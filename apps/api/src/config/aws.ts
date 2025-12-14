import { S3Client } from '@aws-sdk/client-s3';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

/**
 * AWS SDK Configuration
 *
 * NOTE: This configuration uses AWS credentials from the AWS CLI
 * (~/.aws/credentials and ~/.aws/config files)
 *
 * No hardcoded access keys needed!
 */

const AWS_REGION = process.env.AWS_REGION || 'us-east-1';

// S3 Client Configuration
export const s3Client = new S3Client({
  region: AWS_REGION,
  // Credentials are automatically loaded from:
  // 1. Environment variables (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)
  // 2. AWS credentials file (~/.aws/credentials)
  // 3. IAM role (if running on EC2)
});

// DynamoDB Client Configuration
const dynamoDBClient = new DynamoDBClient({
  region: AWS_REGION,
  // Credentials loaded same way as S3
});

// DynamoDB Document Client (easier to use)
export const docClient = DynamoDBDocumentClient.from(dynamoDBClient, {
  marshallOptions: {
    removeUndefinedValues: true,
    convertClassInstanceToMap: true
  },
  unmarshallOptions: {
    wrapNumbers: false
  }
});

// Export clients
export { AWS_REGION };

// Verify AWS credentials on startup
export async function verifyAWSCredentials(): Promise<void> {
  try {
    // Try to list S3 buckets as a test
    const { ListBucketsCommand } = await import('@aws-sdk/client-s3');
    const command = new ListBucketsCommand({});
    await s3Client.send(command);

    console.log('✅ AWS credentials verified successfully');
    console.log(`📍 Using AWS Region: ${AWS_REGION}`);
  } catch (error) {
    console.error('❌ Failed to verify AWS credentials:', error);
    console.error('Make sure you have configured AWS CLI with: aws configure');
    throw new Error('AWS credentials not configured');
  }
}
