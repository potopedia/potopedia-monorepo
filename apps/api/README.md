# PhotoPedia API

Backend API for PhotoPedia - AI-Powered Event Media Platform

## Setup

### Prerequisites

- Node.js 18+ and npm
- AWS Account with access credentials
- Firebase project with Admin SDK

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your actual credentials.

3. Place Firebase service account JSON file at:
```
apps/api/firebase-service-account.json
```

### Database Setup

Create DynamoDB tables:
```bash
npx ts-node src/scripts/create-dynamodb-tables.ts
```

Create S3 buckets:
```bash
npx ts-node src/scripts/create-s3-buckets.ts
```

### Development

Run in development mode:
```bash
npm run dev
```

### Build

Build for production:
```bash
npm run build
```

### Start Production

```bash
npm start
```

## API Endpoints

### Authentication (`/api/auth`)

- `POST /register` - Register new user
- `POST /login` - Login user
- `POST /verify-token` - Verify Firebase token
- `POST /forgot-password` - Request password reset
- `POST /reset-password` - Reset password
- `GET /me` - Get current user profile
- `PUT /me` - Update current user profile

### Events (`/api/events`)

- `POST /` - Create new event (photographer only)
- `GET /` - List events (photographer/client)
- `GET /:eventId` - Get event details
- `PUT /:eventId` - Update event (photographer only)
- `DELETE /:eventId` - Delete event (photographer only)
- `POST /:eventId/publish` - Publish event (photographer only)
- `GET /:eventId/stats` - Get event statistics

## Architecture

### Database (DynamoDB)

- **Users Table**: User accounts and profiles
- **Events Table**: Event information and settings
- **Media Table**: Photos and videos with metadata
- **Analytics Table**: User engagement tracking
- **Favorites Table**: Guest favorites

### Storage (S3)

- **photos/**: Photo storage with multiple versions
- **videos/**: Video storage with transcoded versions
- **ai-videos/**: AI-generated videos
- **qr-codes/**: QR code images
- **watermarks/**: Custom watermark images
- **profile-photos/**: User profile photos

### Services

- **DynamoDB Service**: Generic CRUD operations
- **User Service**: User management
- **Event Service**: Event management
- **S3 Service**: File storage operations

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| NODE_ENV | Environment | development/production |
| AWS_REGION | AWS region | us-east-1 |
| AWS_ACCESS_KEY_ID | AWS access key | AKIAIOSFODNN7EXAMPLE |
| AWS_SECRET_ACCESS_KEY | AWS secret key | wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY |
| DYNAMODB_TABLE_PREFIX | DynamoDB table prefix | photopedia-dev |
| S3_MEDIA_BUCKET | S3 bucket name | photopedia-media-dev |
| ALLOWED_ORIGINS | CORS allowed origins | http://localhost:3000 |

## Security

- Firebase Authentication for user verification
- Role-based access control (photographer, client, guest, admin)
- API rate limiting
- CORS protection
- Helmet security headers

## License

Proprietary
