// @flow

import express from 'express';
import quizRouter from './quiz-router';

/**
 * Express application.
 */
const app = express<express$Request, express$Response>();

app.use(express.json());
app.use('/api/v1', quizRouter);

export default app;
