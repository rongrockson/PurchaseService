import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import PurchaseController from './controllers/purchaseController.js';
import PurchaseService from './services/purchaseService.js';
import PurchaseRepository from './repositories/PurchaseRepository.js';
import Purchase from './models/Purchase.js';
import logger from './utils/logger.js';
import purchaseRoutes from './routes/purchaseRoutes.js';
import UserRepository from './repositories/UserRepository.js';
import User from './models/User.js';
import config from './config/config.js';
import connectDB from './config/db.js'; // Import the connectDB function


dotenv.config();

const app = express();

app.use(cors({
    origin: config.frontendURL,
    credentials: true,
}));

app.use('/purchase', purchaseRoutes);

app.use(express.json());
connectDB(config.mongoURI);




const purchaseRepository = new PurchaseRepository(Purchase);
const userRepository = new UserRepository(User);
const purchaseService = new PurchaseService(purchaseRepository, userRepository);
const purchaseController = new PurchaseController(purchaseService);

app.use('/purchases', purchaseRoutes(purchaseController));

const PORT = config.port || 5002;
app.listen(PORT, () => logger.info(`Purchase service running on port ${PORT}`));



