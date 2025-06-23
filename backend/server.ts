import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { handler as metricsHandler } from './api/metrics';
import { handler as geminiHandler } from './api/gemini-agent';
import { errorHandler } from './middleware/errorHandler';
import AppError from './utils/AppError';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Middleware
// Enable Cross-Origin Resource Sharing to allow requests from your frontend
app.use(cors());
// Parse incoming JSON requests
app.use(express.json());

// API Routes
app.get('/api/metrics', metricsHandler);
app.post('/api/generate', geminiHandler);

app.get('/', (req, res) => {
  res.send('SAInexus Backend is running!');
});

// Handle all other routes that are not defined (404)
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handling Middleware
// This must be the last `app.use` call
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});