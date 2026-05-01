const errorHandler = (err, req, res, next) => {
    console.error('--- ERROR LOG ---');
    console.error('Message:', err.message);
    console.error('Stack:', err.stack);
    console.error('-----------------');

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        status: 'error',
        message: message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

module.exports = errorHandler;
