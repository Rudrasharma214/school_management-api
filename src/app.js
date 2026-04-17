import express from 'express';
import { errorHandler } from './middlewares/error.middleware.js';

const app = express();

app.use(errorHandler);
export default app;