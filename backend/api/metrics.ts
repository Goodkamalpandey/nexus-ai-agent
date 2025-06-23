// This is a mock API endpoint to serve resilience metrics.
// In a real application, this data would come from a database or a monitoring service.
import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync";

const metricsData = [
  { time: "10:00", uptime: 99.9, latency: 120, drift: 0.01 },
  { time: "10:05", uptime: 99.8, latency: 140, drift: 0.03 },
  { time: "10:10", uptime: 99.7, latency: 135, drift: 0.02 },
  { time: "10:15", uptime: 99.9, latency: 110, drift: 0.01 },
  { time: "10:20", uptime: 99.9, latency: 115, drift: 0.015 },
  { time: "10:25", uptime: 99.6, latency: 150, drift: 0.04 },
];

// This handler is designed to be framework-agnostic.
// You would integrate this into your Express, Fastify, or serverless function router.
// For example, in an Express app: app.get('/api/metrics', handler);
export const handler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // Simulate a small network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  res.status(200).json({ status: 'success', data: metricsData });
});