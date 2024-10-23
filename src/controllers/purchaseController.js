

class PurchaseController {
    constructor(purchaseService) {
        this.purchaseService = purchaseService;
    }

    async createPurchase(req, res) {
        try {
            const purchaseData = req.body;
            purchaseData.userId = req.user.id; // Ensure the userId is from the authenticated user
            purchaseData.senderEmail = req.user.email; // Assuming the user has an email field

            // Validate that approverEmail belongs to a manager
            const manager = await this.purchaseService.getManagerByEmail(purchaseData.approverEmail);
            if (!manager || manager.role !== 'manager') {
                return res.status(400).json({ error: 'Approver email must belong to a valid manager' });
            }
            console.log(JSON.stringify(manager) + " here in purchase controller");
            purchaseData.managerId = manager._id;

            const purchase = await this.purchaseService.createPurchase(purchaseData);
            res.status(201).json(purchase);
        } catch (error) {
            console.error('Error creating purchase:', error);
            res.status(500).json({ error: 'Failed to create purchase request' });
        }
    }

    async approvePurchase(req, res) {
        try {
            const purchaseId = req.params.id;
            const managerId = req.user.id;

            // Verify that the purchase is assigned to this manager
            const purchase = await this.purchaseService.getPurchaseById(purchaseId);
            if (!purchase) {
                return res.status(404).json({ error: 'Purchase request not found' });
            }

            if (purchase.managerId.toString() !== managerId) {
                return res.status(403).json({ error: 'You are not authorized to approve this request' });
            }

            const updatedPurchase = await this.purchaseService.approvePurchase(purchaseId);
            res.status(200).json(updatedPurchase);
        } catch (error) {
            console.error('Error approving purchase:', error);
            res.status(500).json({ error: 'Failed to approve purchase request' });
        }
    }

    async rejectPurchase(req, res) {
        try {
            const purchaseId = req.params.id;
            const managerId = req.user.id;
            const { reason } = req.body;

            if (!reason) {
                return res.status(400).json({ error: 'Rejection reason is required' });
            }

            // Verify that the purchase is assigned to this manager
            const purchase = await this.purchaseService.getPurchaseById(purchaseId);
            if (!purchase) {
                return res.status(404).json({ error: 'Purchase request not found' });
            }

            if (purchase.managerId.toString() !== managerId) {
                return res.status(403).json({ error: 'You are not authorized to reject this request' });
            }

            const updatedPurchase = await this.purchaseService.rejectPurchase(purchaseId, reason);
            res.status(200).json(updatedPurchase);
        } catch (error) {
            console.error('Error rejecting purchase:', error);
            res.status(500).json({ error: 'Failed to reject purchase request' });
        }
    }

    async getManagerPurchases(req, res) {
        try {
            console.log("here in purchase controller");
            const managerId = req.user.id;
            console.log(managerId + " here in purchase controller");
            const purchases = await this.purchaseService.getManagerPurchases(managerId);
            res.status(200).json({ requests: purchases });
        } catch (error) {
            console.error('Error fetching manager purchases:', error);
            res.status(500).json({ error: 'Failed to fetch manager purchases' });
        }
    }

    async getUserPurchases(req, res) {
        try {
            const userId = req.params.userId;
            const purchases = await this.purchaseService.getUserPurchases(userId);
            res.status(200).json({ requests: purchases });
        } catch (error) {
            console.error('Error fetching user purchases:', error);
            res.status(500).json({ error: 'Failed to fetch user purchases' });
        }
    }

    // ... other methods
}

export default PurchaseController;
