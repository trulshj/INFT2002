// @flow
import express from 'express';
import quizService, { type Quiz, type Question } from './quiz-service';

/**
 * Express router containing task methods.
 */
const router: express$Router<> = express.Router();

export default router;
