import mongoose from 'mongoose';

const ShopItemSchema = new mongoose.Schema({
    item_id: { type: Number, unique: true, required: true },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image_url: { type: String },
    stock_quantity: { type: Number, required: true }
});

const ShopItem = mongoose.model('shopitem', ShopItemSchema);
export default ShopItem;
