// @flow

import express from 'express';
import taskRouter from './task-router';

/**
 * Express application.
 */
const app = express<express$Request, express$Response>();

app.use(express.json());

// Since API is not compatible with v1, API version is increased to v2
app.use('/api/v2', taskRouter);

export default app;
