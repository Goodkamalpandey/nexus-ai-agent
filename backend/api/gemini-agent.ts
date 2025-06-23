
// Gemini Agent Example using Google Generative Language API (PaLM or Gemini Pro)
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync";
import AppError from "../utils/AppError";

// Configure your API key
const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  throw new Error("FATAL ERROR: GEMINI_API_KEY is not defined in environment variables.");
}
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Basic text generation
export const handler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
    return next(new AppError("Prompt is required and must be a non-empty string.", 400));
  }

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  if (!text) {
    const blockReason = result.response.promptFeedback?.blockReason || 'unknown';
    return next(new AppError(`Content generation was blocked. Reason: ${blockReason}.`, 400));
  }

  res.status(200).json({ status: 'success', data: { output: text } });
});
