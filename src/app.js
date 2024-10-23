import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import PurchaseController from './controllers/PurchaseController.js';
import PurchaseService from './services/purchaseService.js';
import PurchaseRepository from './repositories/PurchaseRepository.js';
import Purchase from './models/Purchase.js';
import logger from './utils/logger.js';
import purchaseRoutes from './routes/purchaseRoutes.js';
import UserRepository from './repositories/UserRepository.js';
import User from './models/User.js';

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',  // Allow your frontend origin
    credentials: true,  // Enable credentials (cookies, authorization headers)
}));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => logger.info('Connected to MongoDB'))
    .catch((err) => logger.error('MongoDB connection error:', err));

const purchaseRepository = new PurchaseRepository(Purchase);
const userRepository = new UserRepository(User);
const purchaseService = new PurchaseService(purchaseRepository, userRepository);
const purchaseController = new PurchaseController(purchaseService);

app.use('/purchases', purchaseRoutes(purchaseController));

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => logger.info(`Purchase service running on port ${PORT}`));



