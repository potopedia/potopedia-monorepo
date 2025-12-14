import dotenv from 'dotenv';
import app from './app';
import { verifyAWSCredentials } from './config/aws';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    // Verify AWS credentials
    await verifyAWSCredentials();

    // Start server
    app.listen(PORT, () => {
      console.log('🚀 PhotoPedia API Server started');
      console.log(`📍 Port: ${PORT}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV}`);
      console.log(`📍 API URL: http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
