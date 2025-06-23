// A simple structured JSON logger.
// In a production environment, this would integrate with a real logging service
// like Winston, Pino, or a cloud provider's logging solution (e.g., CloudWatch, Sentry).

interface LogPayload {
    level: 'info' | 'warn' | 'error';
    message: string;
    timestamp?: string;
    [key: string]: any; // Allow for additional structured data
}

export const log = (payload: LogPayload) => {
    const logObject = {
        ...payload,
        timestamp: new Date().toISOString(),
    };

    // For now, we'll print to the console. A real logger would send this to a service.
    console.log(JSON.stringify(logObject, null, 2)); // Pretty-print for readability
};