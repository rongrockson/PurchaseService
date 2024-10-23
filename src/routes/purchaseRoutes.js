import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
const router = express.Router();

export default (purchaseController) => {
    router.post('/', authenticateToken, purchaseController.createPurchase.bind(purchaseController));
    router.get('/manager', authenticateToken, purchaseController.getManagerPurchases.bind(purchaseController));

    // Route for managers to fetch their assigned purchase requests
    router.put('/:id/approve', authenticateToken, purchaseController.approvePurchase.bind(purchaseController));
    router.put('/:id/reject', authenticateToken, purchaseController.rejectPurchase.bind(purchaseController));
    router.get('/:userId', authenticateToken, purchaseController.getUserPurchases.bind(purchaseController));


    return router;
};
