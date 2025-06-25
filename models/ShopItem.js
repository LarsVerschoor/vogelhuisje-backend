import mongoose from 'mongoose';

const ShopItemSchema = new mongoose.Schema({
    item_id: {
        type: Number,
        unique: true,
        required: [true, 'item_id is verplicht']
    },
    name: {
        type: String,
        required: [true, 'Naam is verplicht'],
        trim: true
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Prijs is verplicht'],
        min: [0, 'Prijs moet positief zijn']
    },
    image_url: {
        type: String,
        default: '',
        trim: true
    },
    stock_quantity: {
        type: Number,
        required: [true, 'Voorraad is verplicht'],
        min: [0, 'Voorraad moet positief zijn'],
        default: 0
    }
}, {
    timestamps: true
});

ShopItemSchema.index({ item_id: 1 }, { unique: true });

const ShopItem = mongoose.model('ShopItem', ShopItemSchema);
export default ShopItem;