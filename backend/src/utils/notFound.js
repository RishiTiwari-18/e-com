import AppError from "./appError.js";

const notFound = (req, res, next) => {
    const error = new AppError(`Can't find ${req.originalUrl} on this server!`, 404);
    next(error);
};

export default notFound;