import mongoose from 'mongoose';

const RentalSchema = new mongoose.Schema({
    rental_id: { type: Number, unique: true, required: true },
    user_id: { type: Number, required: true, ref: 'user' },
    birdhouse_id: { type: Number, required: true, ref: 'birdhouse' },
    start_date: { type: Date, required: true },
    end_date: { type: Date },
    is_active: { type: Boolean, default: true }
});

const Rental = mongoose.model('rental', RentalSchema);
export default Rental;
