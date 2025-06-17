import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
    order_item_id: { type: Number, unique: true, required: true },
    order_id: { type: Number, required: true, ref: 'order' },
    item_id: { type: Number, required: true, ref: 'shopitem' },
    quantity: { type: Number, required: true },
    price_at_purchase: { type: mongoose.Types.Decimal128, required: true }
});

const OrderItem = mongoose.model('orderitem', OrderItemSchema);
export default OrderItem;
