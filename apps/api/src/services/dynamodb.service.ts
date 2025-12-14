import {
  PutCommand,
  GetCommand,
  QueryCommand,
  UpdateCommand,
  DeleteCommand,
  ScanCommand,
  PutCommandInput,
  GetCommandInput,
  QueryCommandInput,
  UpdateCommandInput,
  DeleteCommandInput,
  ScanCommandInput,
} from '@aws-sdk/lib-dynamodb';
import { docClient } from '../config/aws.config';

export class DynamoDBService {
  /**
   * Put an item into DynamoDB table
   */
  async put(params: PutCommandInput) {
    try {
      const command = new PutCommand(params);
      await docClient.send(command);
      return { success: true };
    } catch (error: any) {
      console.error('DynamoDB Put Error:', error);
      throw new Error(`Failed to put item: ${error.message}`);
    }
  }

  /**
   * Get an item from DynamoDB table
   */
  async get<T = any>(params: GetCommandInput): Promise<T | null> {
    try {
      const command = new GetCommand(params);
      const response = await docClient.send(command);
      return (response.Item as T) || null;
    } catch (error: any) {
      console.error('DynamoDB Get Error:', error);
      throw new Error(`Failed to get item: ${error.message}`);
    }
  }

  /**
   * Query items from DynamoDB table
   */
  async query<T = any>(params: QueryCommandInput): Promise<T[]> {
    try {
      const command = new QueryCommand(params);
      const response = await docClient.send(command);
      return (response.Items as T[]) || [];
    } catch (error: any) {
      console.error('DynamoDB Query Error:', error);
      throw new Error(`Failed to query items: ${error.message}`);
    }
  }

  /**
   * Query with pagination
   */
  async queryWithPagination<T = any>(
    params: QueryCommandInput,
    limit?: number
  ): Promise<{ items: T[]; lastKey?: any }> {
    try {
      const command = new QueryCommand({
        ...params,
        ...(limit && { Limit: limit }),
      });
      const response = await docClient.send(command);
      return {
        items: (response.Items as T[]) || [],
        lastKey: response.LastEvaluatedKey,
      };
    } catch (error: any) {
      console.error('DynamoDB Query Error:', error);
      throw new Error(`Failed to query items: ${error.message}`);
    }
  }

  /**
   * Update an item in DynamoDB table
   */
  async update<T = any>(params: UpdateCommandInput): Promise<T | null> {
    try {
      const command = new UpdateCommand(params);
      const response = await docClient.send(command);
      return (response.Attributes as T) || null;
    } catch (error: any) {
      console.error('DynamoDB Update Error:', error);
      throw new Error(`Failed to update item: ${error.message}`);
    }
  }

  /**
   * Delete an item from DynamoDB table
   */
  async delete(params: DeleteCommandInput) {
    try {
      const command = new DeleteCommand(params);
      await docClient.send(command);
      return { success: true };
    } catch (error: any) {
      console.error('DynamoDB Delete Error:', error);
      throw new Error(`Failed to delete item: ${error.message}`);
    }
  }

  /**
   * Scan items from DynamoDB table (use sparingly)
   */
  async scan<T = any>(params: ScanCommandInput): Promise<T[]> {
    try {
      const command = new ScanCommand(params);
      const response = await docClient.send(command);
      return (response.Items as T[]) || [];
    } catch (error: any) {
      console.error('DynamoDB Scan Error:', error);
      throw new Error(`Failed to scan items: ${error.message}`);
    }
  }

  /**
   * Build update expression from object
   */
  buildUpdateExpression(updates: Record<string, any>): {
    UpdateExpression: string;
    ExpressionAttributeNames: Record<string, string>;
    ExpressionAttributeValues: Record<string, any>;
  } {
    const updateParts: string[] = [];
    const expressionAttributeNames: Record<string, string> = {};
    const expressionAttributeValues: Record<string, any> = {};

    Object.entries(updates).forEach(([key, value], index) => {
      const attributeName = `#attr${index}`;
      const attributeValue = `:val${index}`;

      updateParts.push(`${attributeName} = ${attributeValue}`);
      expressionAttributeNames[attributeName] = key;
      expressionAttributeValues[attributeValue] = value;
    });

    return {
      UpdateExpression: `SET ${updateParts.join(', ')}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
    };
  }
}

export const dynamoDBService = new DynamoDBService();
