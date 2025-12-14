import {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  HeadObjectCommand,
  CopyObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3Client, S3_BUCKETS } from '../config/aws.config';
import { Readable } from 'stream';

export class S3Service {
  private bucket = S3_BUCKETS.MEDIA;

  /**
   * Upload file to S3
   */
  async uploadFile(params: {
    key: string;
    body: Buffer | Readable;
    contentType: string;
    metadata?: Record<string, string>;
  }): Promise<{ key: string; bucket: string }> {
    try {
      const command = new PutObjectCommand({
        Bucket: this.bucket,
        Key: params.key,
        Body: params.body,
        ContentType: params.contentType,
        Metadata: params.metadata,
      });

      await s3Client.send(command);

      return {
        key: params.key,
        bucket: this.bucket,
      };
    } catch (error: any) {
      console.error('S3 Upload Error:', error);
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }

  /**
   * Get file from S3
   */
  async getFile(key: string): Promise<Readable> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucket,
        Key: key,
      });

      const response = await s3Client.send(command);
      return response.Body as Readable;
    } catch (error: any) {
      console.error('S3 Get Error:', error);
      throw new Error(`Failed to get file: ${error.message}`);
    }
  }

  /**
   * Delete file from S3
   */
  async deleteFile(key: string): Promise<void> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key,
      });

      await s3Client.send(command);
    } catch (error: any) {
      console.error('S3 Delete Error:', error);
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  }

  /**
   * Check if file exists
   */
  async fileExists(key: string): Promise<boolean> {
    try {
      const command = new HeadObjectCommand({
        Bucket: this.bucket,
        Key: key,
      });

      await s3Client.send(command);
      return true;
    } catch (error: any) {
      if (error.name === 'NotFound') {
        return false;
      }
      throw error;
    }
  }

  /**
   * Copy file within S3
   */
  async copyFile(sourceKey: string, destinationKey: string): Promise<void> {
    try {
      const command = new CopyObjectCommand({
        Bucket: this.bucket,
        CopySource: `${this.bucket}/${sourceKey}`,
        Key: destinationKey,
      });

      await s3Client.send(command);
    } catch (error: any) {
      console.error('S3 Copy Error:', error);
      throw new Error(`Failed to copy file: ${error.message}`);
    }
  }

  /**
   * Generate presigned URL for download
   */
  async getPresignedUrl(key: string, expiresIn: number = 3600): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucket,
        Key: key,
      });

      const url = await getSignedUrl(s3Client, command, { expiresIn });
      return url;
    } catch (error: any) {
      console.error('S3 Presigned URL Error:', error);
      throw new Error(`Failed to generate presigned URL: ${error.message}`);
    }
  }

  /**
   * Generate presigned URL for upload
   */
  async getPresignedUploadUrl(
    key: string,
    contentType: string,
    expiresIn: number = 3600
  ): Promise<string> {
    try {
      const command = new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        ContentType: contentType,
      });

      const url = await getSignedUrl(s3Client, command, { expiresIn });
      return url;
    } catch (error: any) {
      console.error('S3 Presigned Upload URL Error:', error);
      throw new Error(`Failed to generate presigned upload URL: ${error.message}`);
    }
  }

  /**
   * Generate S3 key for photo
   */
  generatePhotoKey(eventId: string, mediaId: string, version: string, extension: string): string {
    return `photos/${eventId}/${version}/${mediaId}${extension}`;
  }

  /**
   * Generate S3 key for video
   */
  generateVideoKey(eventId: string, mediaId: string, version: string, extension: string): string {
    return `videos/${eventId}/${version}/${mediaId}${extension}`;
  }

  /**
   * Generate S3 key for AI video
   */
  generateAIVideoKey(eventId: string, videoId: string, extension: string): string {
    return `ai-videos/${eventId}/${videoId}${extension}`;
  }

  /**
   * Generate S3 key for QR code
   */
  generateQRCodeKey(eventId: string, galleryCode: string): string {
    return `qr-codes/${eventId}/qr_${galleryCode}.png`;
  }

  /**
   * Generate S3 key for watermark
   */
  generateWatermarkKey(userId: string, extension: string): string {
    return `watermarks/${userId}/custom_watermark${extension}`;
  }

  /**
   * Generate S3 key for profile photo
   */
  generateProfilePhotoKey(userId: string, extension: string): string {
    return `profile-photos/${userId}${extension}`;
  }

  /**
   * Delete multiple files
   */
  async deleteMultipleFiles(keys: string[]): Promise<void> {
    try {
      await Promise.all(keys.map((key) => this.deleteFile(key)));
    } catch (error: any) {
      console.error('S3 Delete Multiple Error:', error);
      throw new Error(`Failed to delete multiple files: ${error.message}`);
    }
  }
}

export const s3Service = new S3Service();
