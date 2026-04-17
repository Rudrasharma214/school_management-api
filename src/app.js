import express from 'express';
import { errorHandler } from './middlewares/error.middleware.js';
import schoolRoutes from './routes/school.routes.js';
import { sendResponse } from './utils/response.js';
import { STATUS } from './constants/statusCodes.js';
const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
    sendResponse(res, STATUS.OK, 'Welcome to Educase API');
});

app.use('/', schoolRoutes);

app.use(errorHandler);
export default app;