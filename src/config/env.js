import dotenv from 'dotenv';

dotenv.config({ quiet: true });

const env = {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    
    db_host: process.env.DB_HOST || 'localhost',
    db_port: process.env.DB_PORT || 3306,
    db_name: process.env.DB_NAME || 'tms_db',
    db_user: process.env.DB_USER || 'tms_user',
    db_password: process.env.DB_PASSWORD || 'tms_password',
};

export default env;