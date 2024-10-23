import dotenv from 'dotenv';
dotenv.config();
const config = {
    mongoURI: process.env.MONGODB_URI,
    port: process.env.PORT || 5002,
    jwt: process.env.JWT_SECRET,
    frontendURL: process.env.FRONTEND_URL,
    notifyServiceURL: process.env.NOTIFY_SERVICE_URL,
    env: process.env.NODE_ENV,
};

export default config;
