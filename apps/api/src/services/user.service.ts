import { v4 as uuidv4 } from 'uuid';
import { dynamoDBService } from './dynamodb.service';
import { TABLES, getPlanLimits } from '../config/aws.config';
import { User, CreateUserInput, UpdateUserInput } from '../models/user.model';

export class UserService {
  /**
   * Create a new user
   */
  async createUser(input: CreateUserInput): Promise<User> {
    const userId = uuidv4();
    const now = Date.now();

    const planLimits = getPlanLimits('free');

    const user: User = {
      PK: `USER#${userId}`,
      SK: 'PROFILE',
      userId,
      email: input.email,
      firebaseUid: input.firebaseUid,
      role: input.role,
      firstName: input.firstName,
      lastName: input.lastName,
      phone: input.phone,
      subscriptionTier: 'free',
      subscriptionStatus: 'active',
      limits: planLimits,
      currentUsage: {
        totalEvents: 0,
        totalStorageGB: 0,
        videosThisMonth: 0,
      },
      GSI1PK: `EMAIL#${input.email}`,
      GSI1SK: 'USER',
      GSI2PK: `ROLE#${input.role}`,
      GSI2SK: `USER#${userId}`,
      createdAt: now,
      updatedAt: now,
      isActive: true,
    };

    await dynamoDBService.put({
      TableName: TABLES.USERS,
      Item: user,
    });

    return user;
  }

  /**
   * Get user by userId
   */
  async getUserById(userId: string): Promise<User | null> {
    return await dynamoDBService.get<User>({
      TableName: TABLES.USERS,
      Key: {
        PK: `USER#${userId}`,
        SK: 'PROFILE',
      },
    });
  }

  /**
   * Get user by email
   */
  async getUserByEmail(email: string): Promise<User | null> {
    const users = await dynamoDBService.query<User>({
      TableName: TABLES.USERS,
      IndexName: 'GSI1',
      KeyConditionExpression: 'GSI1PK = :email',
      ExpressionAttributeValues: {
        ':email': `EMAIL#${email}`,
      },
    });

    return users.length > 0 ? users[0] : null;
  }

  /**
   * Get user by Firebase UID
   */
  async getUserByFirebaseUid(firebaseUid: string): Promise<User | null> {
    const users = await dynamoDBService.scan<User>({
      TableName: TABLES.USERS,
      FilterExpression: 'firebaseUid = :uid',
      ExpressionAttributeValues: {
        ':uid': firebaseUid,
      },
    });

    return users.length > 0 ? users[0] : null;
  }

  /**
   * Update user
   */
  async updateUser(userId: string, input: UpdateUserInput): Promise<User | null> {
    const updates: Record<string, any> = {
      ...input,
      updatedAt: Date.now(),
    };

    const { UpdateExpression, ExpressionAttributeNames, ExpressionAttributeValues } =
      dynamoDBService.buildUpdateExpression(updates);

    return await dynamoDBService.update<User>({
      TableName: TABLES.USERS,
      Key: {
        PK: `USER#${userId}`,
        SK: 'PROFILE',
      },
      UpdateExpression,
      ExpressionAttributeNames,
      ExpressionAttributeValues,
      ReturnValues: 'ALL_NEW',
    });
  }

  /**
   * Update user last login
   */
  async updateLastLogin(userId: string): Promise<void> {
    await dynamoDBService.update({
      TableName: TABLES.USERS,
      Key: {
        PK: `USER#${userId}`,
        SK: 'PROFILE',
      },
      UpdateExpression: 'SET lastLoginAt = :now',
      ExpressionAttributeValues: {
        ':now': Date.now(),
      },
    });
  }

  /**
   * Update user usage statistics
   */
  async updateUsage(
    userId: string,
    usage: {
      totalEvents?: number;
      totalStorageGB?: number;
      videosThisMonth?: number;
    }
  ): Promise<void> {
    const updateExpressions: string[] = [];
    const expressionAttributeValues: Record<string, any> = {
      ':now': Date.now(),
    };

    if (usage.totalEvents !== undefined) {
      updateExpressions.push('currentUsage.totalEvents = :events');
      expressionAttributeValues[':events'] = usage.totalEvents;
    }

    if (usage.totalStorageGB !== undefined) {
      updateExpressions.push('currentUsage.totalStorageGB = :storage');
      expressionAttributeValues[':storage'] = usage.totalStorageGB;
    }

    if (usage.videosThisMonth !== undefined) {
      updateExpressions.push('currentUsage.videosThisMonth = :videos');
      expressionAttributeValues[':videos'] = usage.videosThisMonth;
    }

    if (updateExpressions.length > 0) {
      await dynamoDBService.update({
        TableName: TABLES.USERS,
        Key: {
          PK: `USER#${userId}`,
          SK: 'PROFILE',
        },
        UpdateExpression: `SET ${updateExpressions.join(', ')}, updatedAt = :now`,
        ExpressionAttributeValues: expressionAttributeValues,
      });
    }
  }

  /**
   * Get users by role
   */
  async getUsersByRole(role: 'photographer' | 'client' | 'guest' | 'admin'): Promise<User[]> {
    return await dynamoDBService.query<User>({
      TableName: TABLES.USERS,
      IndexName: 'GSI2',
      KeyConditionExpression: 'GSI2PK = :role',
      ExpressionAttributeValues: {
        ':role': `ROLE#${role}`,
      },
    });
  }

  /**
   * Delete user (soft delete - set isActive to false)
   */
  async deleteUser(userId: string): Promise<void> {
    await dynamoDBService.update({
      TableName: TABLES.USERS,
      Key: {
        PK: `USER#${userId}`,
        SK: 'PROFILE',
      },
      UpdateExpression: 'SET isActive = :false, updatedAt = :now',
      ExpressionAttributeValues: {
        ':false': false,
        ':now': Date.now(),
      },
    });
  }
}

export const userService = new UserService();
