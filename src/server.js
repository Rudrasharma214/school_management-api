import app from './app.js';
import { disconnectDatabase, initializeDatabase } from './config/db.js';
import env from './config/env.js';
import { logger } from './utils/logger.js';

const startServer = async () => {
    try {
        await initializeDatabase();

        const port = Number(env.port) || 5000;
        const server = app.listen(port, () => {
            logger.info(`Server running on port ${port}`);
        });

        const shutdown = async () => {
            server.close(async () => {
                await disconnectDatabase();
                process.exit(0);
            });
        };

        process.on('SIGINT', shutdown);
        process.on('SIGTERM', shutdown);
    } catch (error) {
        logger.error('Server startup failed:', error);
        process.exit(1);
    }
};

startServer();
