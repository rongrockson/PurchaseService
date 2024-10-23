import axios from 'axios';
import config from '../config/config.js';

class PurchaseService {
    constructor(purchaseRepository, userRepository) {
        this.purchaseRepository = purchaseRepository;
        this.userRepository = userRepository; // To fetch user details
    }

    async getManagerByEmail(email) {
        // Assuming you have a method in userRepository to find a user by email
        const manager = this.userRepository.findUserByEmail(email);
        return manager;
    }

    async createPurchase(purchaseData) {
        try {
            const purchaseDataFormatted = {
                userId: purchaseData.userId,
                itemName: purchaseData.itemName,
                quantity: purchaseData.quantity,
                unitPrice: purchaseData.unitPrice,
                totalPrice: purchaseData.totalPrice,
                shippingCharges: purchaseData.shippingCharges,
                taxAmount: purchaseData.taxAmount,
                status: 'pending',
                approverEmail: purchaseData.approverEmail,
                senderEmail: purchaseData.senderEmail,
                managerId: purchaseData.managerId,
            };
            console.log(JSON.stringify(purchaseDataFormatted) + " here in purchase service");
            const purchase = await this.purchaseRepository.createPurchase(purchaseDataFormatted);
            // Optionally, send notifications
            try {
                axios.post(`${config.notifyServiceURL}/notify/purchase`, {
                    senderEmail: purchase.senderEmail,
                    approverEmail: purchase.approverEmail,
                    status: 'pending',
                });
            } catch (error) {
                console.error('Error sending notification:', error);
            }
            return purchase;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async approvePurchase(id) {
        try {
            const purchase = await this.purchaseRepository.approvePurchase(id);
            axios.post(`${config.notifyServiceURL}/notify/purchase`, {
                senderEmail: purchase.senderEmail,
                approverEmail: purchase.approverEmail,
                status: 'approved',
            });
            return purchase;
        } catch (error) {
            console.error('Error approving purchase:', error);
            throw error;
        }
    }

    async rejectPurchase(id, reason) {
        try {
            const purchase = await this.purchaseRepository.rejectPurchase(id, reason);
            axios.post(`${config.notifyServiceURL}/notify/purchase`, {
                senderEmail: purchase.senderEmail,
                approverEmail: purchase.approverEmail,
                status: 'rejected',
                reason
            });
            return purchase;
        } catch (error) {
            console.error('Error rejecting purchase:', error);
            throw error;
        }
    }

    async getManagerPurchases(managerId) {
        return this.purchaseRepository.getManagerPurchases(managerId);
    }

    async getUserPurchases(userId) {
        return this.purchaseRepository.getUserPurchases(userId);
    }

    async getPurchaseById(purchaseId) {
        return this.purchaseRepository.getPurchaseById(purchaseId);
    }

    // ... other methods
}

export default PurchaseService;
