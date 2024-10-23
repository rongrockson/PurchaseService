class PurchaseRepository {
    constructor(Purchase) {
        this.Purchase = Purchase;
    }

    async createPurchase(purchaseData) {
        try {
            const purchase = new this.Purchase(purchaseData);
            return purchase.save();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async approvePurchase(id) {
        try {
            return this.Purchase.findByIdAndUpdate(id, { status: 'approved' }, { new: true });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async rejectPurchase(id, reason) {
        try {
            return this.Purchase.findByIdAndUpdate(id, { status: 'rejected', rejectionReason: reason }, { new: true });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getUserPurchases(userId) {
        try {
            return this.Purchase.find({ userId });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getManagerPurchases(managerId) {
        try {
            return this.Purchase.find({ managerId });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getPurchaseById(purchaseId) {
        try {
            return this.Purchase.findById(purchaseId);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // ... other methods
}

export default PurchaseRepository;
