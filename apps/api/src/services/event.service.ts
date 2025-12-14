import { v4 as uuidv4 } from 'uuid';
import { dynamoDBService } from './dynamodb.service';
import { TABLES } from '../config/aws.config';
import { Event, CreateEventInput, UpdateEventInput } from '../models/event.model';

export class EventService {
  /**
   * Generate unique gallery code
   */
  private generateGalleryCode(eventName: string): string {
    const sanitized = eventName
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '-')
      .substring(0, 20);
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${sanitized}-${randomSuffix}`;
  }

  /**
   * Create a new event
   */
  async createEvent(input: CreateEventInput): Promise<Event> {
    const eventId = uuidv4();
    const now = Date.now();
    const galleryCode = this.generateGalleryCode(input.eventName);

    const event: Event = {
      PK: `EVENT#${eventId}`,
      SK: 'METADATA',
      eventId,
      photographerId: input.photographerId,
      eventName: input.eventName,
      eventDate: input.eventDate,
      eventTime: input.eventTime,
      location: input.location,
      description: input.description,
      eventType: input.eventType,
      clientId: input.clientId,
      clientName: input.clientName,
      clientEmail: input.clientEmail,
      galleryCode,
      galleryPassword: input.galleryPassword,
      galleryExpiry: input.galleryExpiry,
      isPublic: input.isPublic,
      accessSettings: input.accessSettings,
      stats: {
        totalPhotos: 0,
        totalVideos: 0,
        totalViews: 0,
        totalDownloads: 0,
        totalFavorites: 0,
        uniqueVisitors: 0,
      },
      status: 'draft',
      GSI1PK: `PHOTOGRAPHER#${input.photographerId}`,
      GSI1SK: `EVENT#${input.eventDate}`,
      GSI2PK: `CODE#${galleryCode}`,
      GSI2SK: 'EVENT',
      ...(input.clientId && {
        GSI3PK: `CLIENT#${input.clientId}`,
        GSI3SK: `EVENT#${input.eventDate}`,
      }),
      createdAt: now,
      updatedAt: now,
    };

    await dynamoDBService.put({
      TableName: TABLES.EVENTS,
      Item: event,
    });

    return event;
  }

  /**
   * Get event by ID
   */
  async getEventById(eventId: string): Promise<Event | null> {
    return await dynamoDBService.get<Event>({
      TableName: TABLES.EVENTS,
      Key: {
        PK: `EVENT#${eventId}`,
        SK: 'METADATA',
      },
    });
  }

  /**
   * Get event by gallery code
   */
  async getEventByGalleryCode(galleryCode: string): Promise<Event | null> {
    const events = await dynamoDBService.query<Event>({
      TableName: TABLES.EVENTS,
      IndexName: 'GSI2',
      KeyConditionExpression: 'GSI2PK = :code',
      ExpressionAttributeValues: {
        ':code': `CODE#${galleryCode}`,
      },
    });

    return events.length > 0 ? events[0] : null;
  }

  /**
   * Get events by photographer
   */
  async getEventsByPhotographer(
    photographerId: string,
    limit?: number,
    lastKey?: any
  ): Promise<{ items: Event[]; lastKey?: any }> {
    return await dynamoDBService.queryWithPagination<Event>(
      {
        TableName: TABLES.EVENTS,
        IndexName: 'GSI1',
        KeyConditionExpression: 'GSI1PK = :photographer',
        ExpressionAttributeValues: {
          ':photographer': `PHOTOGRAPHER#${photographerId}`,
        },
        ScanIndexForward: false, // Most recent first
        ...(lastKey && { ExclusiveStartKey: lastKey }),
      },
      limit
    );
  }

  /**
   * Get events by client
   */
  async getEventsByClient(
    clientId: string,
    limit?: number,
    lastKey?: any
  ): Promise<{ items: Event[]; lastKey?: any }> {
    return await dynamoDBService.queryWithPagination<Event>(
      {
        TableName: TABLES.EVENTS,
        IndexName: 'GSI3',
        KeyConditionExpression: 'GSI3PK = :client',
        ExpressionAttributeValues: {
          ':client': `CLIENT#${clientId}`,
        },
        ScanIndexForward: false,
        ...(lastKey && { ExclusiveStartKey: lastKey }),
      },
      limit
    );
  }

  /**
   * Update event
   */
  async updateEvent(eventId: string, input: UpdateEventInput): Promise<Event | null> {
    const updates: Record<string, any> = {
      ...input,
      updatedAt: Date.now(),
    };

    const { UpdateExpression, ExpressionAttributeNames, ExpressionAttributeValues } =
      dynamoDBService.buildUpdateExpression(updates);

    return await dynamoDBService.update<Event>({
      TableName: TABLES.EVENTS,
      Key: {
        PK: `EVENT#${eventId}`,
        SK: 'METADATA',
      },
      UpdateExpression,
      ExpressionAttributeNames,
      ExpressionAttributeValues,
      ReturnValues: 'ALL_NEW',
    });
  }

  /**
   * Update event stats
   */
  async updateEventStats(
    eventId: string,
    stats: {
      totalPhotos?: number;
      totalVideos?: number;
      totalViews?: number;
      totalDownloads?: number;
      totalFavorites?: number;
      uniqueVisitors?: number;
    }
  ): Promise<void> {
    const updateExpressions: string[] = [];
    const expressionAttributeValues: Record<string, any> = {
      ':now': Date.now(),
    };

    Object.entries(stats).forEach(([key, value]) => {
      if (value !== undefined) {
        const attrKey = `:${key}`;
        updateExpressions.push(`stats.${key} = ${attrKey}`);
        expressionAttributeValues[attrKey] = value;
      }
    });

    if (updateExpressions.length > 0) {
      await dynamoDBService.update({
        TableName: TABLES.EVENTS,
        Key: {
          PK: `EVENT#${eventId}`,
          SK: 'METADATA',
        },
        UpdateExpression: `SET ${updateExpressions.join(', ')}, updatedAt = :now`,
        ExpressionAttributeValues: expressionAttributeValues,
      });
    }
  }

  /**
   * Increment event stat
   */
  async incrementEventStat(
    eventId: string,
    stat: 'totalPhotos' | 'totalVideos' | 'totalViews' | 'totalDownloads' | 'totalFavorites' | 'uniqueVisitors',
    increment: number = 1
  ): Promise<void> {
    await dynamoDBService.update({
      TableName: TABLES.EVENTS,
      Key: {
        PK: `EVENT#${eventId}`,
        SK: 'METADATA',
      },
      UpdateExpression: `ADD stats.#stat :inc SET updatedAt = :now`,
      ExpressionAttributeNames: {
        '#stat': stat,
      },
      ExpressionAttributeValues: {
        ':inc': increment,
        ':now': Date.now(),
      },
    });
  }

  /**
   * Delete event
   */
  async deleteEvent(eventId: string): Promise<void> {
    await dynamoDBService.delete({
      TableName: TABLES.EVENTS,
      Key: {
        PK: `EVENT#${eventId}`,
        SK: 'METADATA',
      },
    });
  }

  /**
   * Publish event (change status to active)
   */
  async publishEvent(eventId: string): Promise<Event | null> {
    return await dynamoDBService.update<Event>({
      TableName: TABLES.EVENTS,
      Key: {
        PK: `EVENT#${eventId}`,
        SK: 'METADATA',
      },
      UpdateExpression: 'SET #status = :active, publishedAt = :now, updatedAt = :now',
      ExpressionAttributeNames: {
        '#status': 'status',
      },
      ExpressionAttributeValues: {
        ':active': 'active',
        ':now': Date.now(),
      },
      ReturnValues: 'ALL_NEW',
    });
  }
}

export const eventService = new EventService();
