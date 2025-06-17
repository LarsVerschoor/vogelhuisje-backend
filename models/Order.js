import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    order_id: { type: Number, unique: true, required: true },
    user_id: { type: Number, required: true, ref: 'user' },
    order_date: { type: Date, required: true },
    paid: { type: Boolean, default: false },
    total_price: { type: mongoose.Types.Decimal128, required: true }
});

const Order = mongoose.model('order', OrderSchema);
export default Order;
