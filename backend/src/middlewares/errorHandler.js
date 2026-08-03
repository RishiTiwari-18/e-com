const errorHandler = (err, req, res, next) => {

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        success: false,
        stack: err.stack,
        error: message,
    });
}

export default errorHandler;