import dotenv from 'dotenv';
import path from 'path';

// Load .env file from apps/api directory
dotenv.config({ path: path.join(__dirname, '../../.env') });

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  CreateTableCommand,
  CreateTableCommandInput,
  BillingMode,
  KeyType,
  ScalarAttributeType,
  ProjectionType,
} from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({ region: process.env.AWS_REGION || 'us-east-1' });

const TABLE_PREFIX = process.env.DYNAMODB_TABLE_PREFIX || 'photopedia-dev';

// Table 1: Users Table
const usersTableConfig: CreateTableCommandInput = {
  TableName: `${TABLE_PREFIX}-users`,
  BillingMode: BillingMode.PAY_PER_REQUEST,
  KeySchema: [
    { AttributeName: 'PK', KeyType: KeyType.HASH },
    { AttributeName: 'SK', KeyType: KeyType.RANGE },
  ],
  AttributeDefinitions: [
    { AttributeName: 'PK', AttributeType: ScalarAttributeType.S },
    { AttributeName: 'SK', AttributeType: ScalarAttributeType.S },
    { AttributeName: 'GSI1PK', AttributeType: ScalarAttributeType.S },
    { AttributeName: 'GSI1SK', AttributeType: ScalarAttributeType.S },
    { AttributeName: 'GSI2PK', AttributeType: ScalarAttributeType.S },
    { AttributeName: 'GSI2SK', AttributeType: ScalarAttributeType.S },
  ],
  GlobalSecondaryIndexes: [
    {
      IndexName: 'GSI1',
      KeySchema: [
        { AttributeName: 'GSI1PK', KeyType: KeyType.HASH },
        { AttributeName: 'GSI1SK', KeyType: KeyType.RANGE },
      ],
      Projection: { ProjectionType: ProjectionType.ALL },
    },
    {
      IndexName: 'GSI2',
      KeySchema: [
        { AttributeName: 'GSI2PK', KeyType: KeyType.HASH },
        { AttributeName: 'GSI2SK', KeyType: KeyType.RANGE },
      ],
      Projection: { ProjectionType: ProjectionType.ALL },
    },
  ],
};

// Table 2: Events Table
const eventsTableConfig: CreateTableCommandInput = {
  TableName: `${TABLE_PREFIX}-events`,
  BillingMode: BillingMode.PAY_PER_REQUEST,
  KeySchema: [
    { AttributeName: 'PK', KeyType: KeyType.HASH },
    { AttributeName: 'SK', KeyType: KeyType.RANGE },
  ],
  AttributeDefinitions: [
    { AttributeName: 'PK', AttributeType: ScalarAttributeType.S },
    { AttributeName: 'SK', AttributeType: ScalarAttributeType.S },
    { AttributeName: 'GSI1PK', AttributeType: ScalarAttributeType.S },
    { AttributeName: 'GSI1SK', AttributeType: ScalarAttributeType.S },
    { AttributeName: 'GSI2PK', AttributeType: ScalarAttributeType.S },
    { AttributeName: 'GSI2SK', AttributeType: ScalarAttributeType.S },
    { AttributeName: 'GSI3PK', AttributeType: ScalarAttributeType.S },
    { AttributeName: 'GSI3SK', AttributeType: ScalarAttributeType.S },
  ],
  GlobalSecondaryIndexes: [
    {
      IndexName: 'GSI1',
      KeySchema: [
        { AttributeName: 'GSI1PK', KeyType: KeyType.HASH },
        { AttributeName: 'GSI1SK', KeyType: KeyType.RANGE },
      ],
      Projection: { ProjectionType: ProjectionType.ALL },
    },
    {
      IndexName: 'GSI2',
      KeySchema: [
        { AttributeName: 'GSI2PK', KeyType: KeyType.HASH },
        { AttributeName: 'GSI2SK', KeyType: KeyType.RANGE },
      ],
      Projection: { ProjectionType: ProjectionType.ALL },
    },
    {
      IndexName: 'GSI3',
      KeySchema: [
        { AttributeName: 'GSI3PK', KeyType: KeyType.HASH },
        { AttributeName: 'GSI3SK', KeyType: KeyType.RANGE },
      ],
      Projection: { ProjectionType: ProjectionType.ALL },
    },
  ],
};

// Table 3: Media Table
const mediaTableConfig: CreateTableCommandInput = {
  TableName: `${TABLE_PREFIX}-media`,
  BillingMode: BillingMode.PAY_PER_REQUEST,
  KeySchema: [
    { AttributeName: 'PK', KeyType: KeyType.HASH },
    { AttributeName: 'SK', KeyType: KeyType.RANGE },
  ],
  AttributeDefinitions: [
    { AttributeName: 'PK', AttributeType: ScalarAttributeType.S },
    { AttributeName: 'SK', AttributeType: ScalarAttributeType.S },
    { AttributeName: 'GSI1PK', AttributeType: ScalarAttributeType.S },
    { AttributeName: 'GSI1SK', AttributeType: ScalarAttributeType.S },
    { AttributeName: 'GSI2PK', AttributeType: ScalarAttributeType.S },
    { AttributeName: 'GSI2SK', AttributeType: ScalarAttributeType.S },
    { AttributeName: 'GSI3PK', AttributeType: ScalarAttributeType.S },
    { AttributeName: 'GSI3SK', AttributeType: ScalarAttributeType.S },
  ],
  GlobalSecondaryIndexes: [
    {
      IndexName: 'GSI1',
      KeySchema: [
        { AttributeName: 'GSI1PK', KeyType: KeyType.HASH },
        { AttributeName: 'GSI1SK', KeyType: KeyType.RANGE },
      ],
      Projection: { ProjectionType: ProjectionType.ALL },
    },
    {
      IndexName: 'GSI2',
      KeySchema: [
        { AttributeName: 'GSI2PK', KeyType: KeyType.HASH },
        { AttributeName: 'GSI2SK', KeyType: KeyType.RANGE },
      ],
      Projection: { ProjectionType: ProjectionType.ALL },
    },
    {
      IndexName: 'GSI3',
      KeySchema: [
        { AttributeName: 'GSI3PK', KeyType: KeyType.HASH },
        { AttributeName: 'GSI3SK', KeyType: KeyType.RANGE },
      ],
      Projection: { ProjectionType: ProjectionType.ALL },
    },
  ],
};

// Table 4: Analytics Table
const analyticsTableConfig: CreateTableCommandInput = {
  TableName: `${TABLE_PREFIX}-analytics`,
  BillingMode: BillingMode.PAY_PER_REQUEST,
  KeySchema: [
    { AttributeName: 'PK', KeyType: KeyType.HASH },
    { AttributeName: 'SK', KeyType: KeyType.RANGE },
  ],
  AttributeDefinitions: [
    { AttributeName: 'PK', AttributeType: ScalarAttributeType.S },
    { AttributeName: 'SK', AttributeType: ScalarAttributeType.S },
    { AttributeName: 'GSI1PK', AttributeType: ScalarAttributeType.S },
    { AttributeName: 'GSI1SK', AttributeType: ScalarAttributeType.S },
    { AttributeName: 'GSI2PK', AttributeType: ScalarAttributeType.S },
    { AttributeName: 'GSI2SK', AttributeType: ScalarAttributeType.S },
  ],
  GlobalSecondaryIndexes: [
    {
      IndexName: 'GSI1',
      KeySchema: [
        { AttributeName: 'GSI1PK', KeyType: KeyType.HASH },
        { AttributeName: 'GSI1SK', KeyType: KeyType.RANGE },
      ],
      Projection: { ProjectionType: ProjectionType.ALL },
    },
    {
      IndexName: 'GSI2',
      KeySchema: [
        { AttributeName: 'GSI2PK', KeyType: KeyType.HASH },
        { AttributeName: 'GSI2SK', KeyType: KeyType.RANGE },
      ],
      Projection: { ProjectionType: ProjectionType.ALL },
    },
  ],
};

// Table 5: Favorites Table
const favoritesTableConfig: CreateTableCommandInput = {
  TableName: `${TABLE_PREFIX}-favorites`,
  BillingMode: BillingMode.PAY_PER_REQUEST,
  KeySchema: [
    { AttributeName: 'PK', KeyType: KeyType.HASH },
    { AttributeName: 'SK', KeyType: KeyType.RANGE },
  ],
  AttributeDefinitions: [
    { AttributeName: 'PK', AttributeType: ScalarAttributeType.S },
    { AttributeName: 'SK', AttributeType: ScalarAttributeType.S },
    { AttributeName: 'GSI1PK', AttributeType: ScalarAttributeType.S },
    { AttributeName: 'GSI1SK', AttributeType: ScalarAttributeType.S },
  ],
  GlobalSecondaryIndexes: [
    {
      IndexName: 'GSI1',
      KeySchema: [
        { AttributeName: 'GSI1PK', KeyType: KeyType.HASH },
        { AttributeName: 'GSI1SK', KeyType: KeyType.RANGE },
      ],
      Projection: { ProjectionType: ProjectionType.ALL },
    },
  ],
};

async function createTable(config: CreateTableCommandInput) {
  try {
    const command = new CreateTableCommand(config);
    const response = await client.send(command);
    console.log(`✅ Table created: ${config.TableName}`);
    return response;
  } catch (error: any) {
    if (error.name === 'ResourceInUseException') {
      console.log(`ℹ️  Table already exists: ${config.TableName}`);
    } else {
      console.error(`❌ Error creating table ${config.TableName}:`, error.message);
      throw error;
    }
  }
}

async function createAllTables() {
  console.log('🚀 Starting DynamoDB table creation...\n');

  try {
    await createTable(usersTableConfig);
    await createTable(eventsTableConfig);
    await createTable(mediaTableConfig);
    await createTable(analyticsTableConfig);
    await createTable(favoritesTableConfig);

    console.log('\n✅ All tables created successfully!');
  } catch (error) {
    console.error('\n❌ Failed to create tables:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  createAllTables();
}

export { createAllTables };
