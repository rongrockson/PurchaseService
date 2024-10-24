import jwt from 'jsonwebtoken';
import { AppError } from '../utils/errorHandler.js';
import config from '../config/config.js';

export const authenticateToken = (req, res, next) => {
    console.log('headers:' + JSON.stringify(req.headers));
    const authHeader = req.headers['cookie'];
    const token = authHeader && authHeader.split('=')[1];  // Extract token

    if (!token) {
        console.error('No token found in request');
        return next(new AppError('Authentication required', 401));
    }

    try {
        const user = jwt.verify(token, config.jwt);
        console.log('Decoded user from JWT:', user);  // Log decoded data
        req.user = user;
        console.log('userId:', user.id);  // Ensure `id` is present
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        next(new AppError('Invalid token', 401));
    }
};

