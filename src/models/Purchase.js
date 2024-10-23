import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // The ID of the user who created the request
    itemName: { type: String, required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    shippingCharges: { type: Number, required: true },
    taxAmount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    approverEmail: { type: String, required: true }, // Manager's email
    senderEmail: { type: String, required: true }, // User's email
    rejectionReason: { type: String }, // Reason for rejection
    managerId: { type: String },
}, { timestamps: true });

const Purchase = mongoose.model('Purchase', purchaseSchema);

export default Purchase;
