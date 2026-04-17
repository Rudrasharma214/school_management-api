import mysql from 'mysql2/promise';
import env from './env.js';

const requiredVars = ['db_host', 'db_user', 'db_password', 'db_name'];

let pool;

const validateConfig = () => {
    const missingVars = requiredVars.filter((key) => !env[key]);

    if (missingVars.length > 0) {
        throw new Error(`Missing required database environment variables: ${missingVars.join(', ')}`);
    }

    if (env.db_port !== undefined && env.db_port !== null && env.db_port !== '' && Number.isNaN(Number(env.db_port))) {
        throw new Error('DB_PORT must be a valid number');
    }
};

const buildPoolConfig = () => ({
    host: env.db_host,
    port: Number(env.db_port) || 3306,
    user: env.db_user,
    password: env.db_password,
    database: env.db_name,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});

const ensureSchoolsTable = async (connection) => {
    await connection.execute(`
        CREATE TABLE IF NOT EXISTS schools (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL,
            latitude FLOAT NOT NULL,
            longitude FLOAT NOT NULL
        )
    `);
};

export const initializeDatabase = async () => {
    validateConfig();

    if (!pool) {
        pool = mysql.createPool(buildPoolConfig());
    }

    const connection = await pool.getConnection();
    try {
        await connection.ping();
        await ensureSchoolsTable(connection);
    } finally {
        connection.release();
    }

    return pool;
};

export const getPool = () => {
    if (!pool) {
        throw new Error('Database not initialized. Call initializeDatabase first.');
    }

    return pool;
};

export const disconnectDatabase = async () => {
    if (!pool) {
        return;
    }

    await pool.end();
    pool = undefined;
};