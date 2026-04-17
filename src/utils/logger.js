const buildLogEntry = (level, message, context = {}) => {
    return {
        timestamp: new Date().toISOString(),
        level,
        message,
        ...context,
    };
};

export const logger = {
    info: (message, context = {}) => {
        console.log(JSON.stringify(buildLogEntry('info', message, context)));
    },
    warn: (message, context = {}) => {
        console.warn(JSON.stringify(buildLogEntry('warn', message, context)));
    },
    error: (message, context = {}) => {
        console.error(JSON.stringify(buildLogEntry('error', message, context)));
    },
};