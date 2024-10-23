import jwt from 'jsonwebtoken';
import { AppError } from '../utils/errorHandler.js';
import config from '../config/config.js';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['cookie'];
    const token = authHeader && authHeader.split('=')[1];  // Extract the token from 'Bearer <token>'

    if (!token) {
        return next(new AppError('Authentication required', 401));
    }

    try {
        const user = jwt.verify(token, config.jwt);  // Correctly verifying with secret
        req.user = user;  // Attach the google user object to the request
        console.log(JSON.stringify(user));
        next();  // Continue with the request
    } catch (error) {
        next(new AppError('Invalid token', 401));  // Handle invalid token
    }
};
