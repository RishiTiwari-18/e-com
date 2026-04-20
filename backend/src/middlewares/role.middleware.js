import AppError from "../utils/appError.js";

const authorizedRole = (...roles) => {
    return (req, res, next) => {
        const user = req.user

        if (!user) {
            return next(new AppError("Unauthorized", 401));
        }

        if (!roles.includes(user.role)) {
            return next(new AppError("Forbidden: You don't have access", 403));
        }

        next();
    }
}

export const isSeller = authorizedRole('seller');
export const isBuyer = authorizedRole('buyer');