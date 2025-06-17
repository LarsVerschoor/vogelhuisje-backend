import mongoose from 'mongoose';

const RecordingSchema = new mongoose.Schema({
    recording_id: { type: Number, unique: true, required: true },
    rental_id: { type: Number, required: true, ref: 'rental' },
    clip_url: { type: String },
    timestamp: { type: String }, // time only
    duration: { type: String }, // time only
    note: { type: String, maxlength: 50 }
});

const Recording = mongoose.model('recording', RecordingSchema);
export default Recording;
