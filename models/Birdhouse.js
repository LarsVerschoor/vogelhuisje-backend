import mongoose from 'mongoose';

const BirdhouseSchema = new mongoose.Schema({
    birdhouse_id: { type: Number, unique: true, required: true },
    location_description: { type: String },
    is_available: { type: Boolean, default: true },
    price: { type: mongoose.Types.Decimal128, required: true },
    camera_id: { type: Number, ref: 'camera' },
    owner_id: { type: Number, ref: 'user' },
    added_at: { type: Date, default: Date.now }
});

const Birdhouse = mongoose.model('birdhouse', BirdhouseSchema);
export default Birdhouse;
